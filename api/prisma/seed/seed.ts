/* eslint-disable no-shadow */

import { createSeedClient } from '@snaplet/seed';
import { copycat } from '@snaplet/copycat';

const seed = await createSeedClient({ connect: true });
await seed.$resetDatabase();

const { permission } = await seed.permission([
  { name: 'user:read:any' },
  { name: 'user:read:own' },
  { name: 'user:update:any' },
  { name: 'user:update:own' },
  { name: 'user:delete:any' },
  { name: 'user:delete:own' },
  { name: 'user:ban:any' },
]);

const { role } = await seed.role([{ name: 'ADMIN' }, { name: 'USER' }]);

const adminRoleID = role.find(({ name }) => name === 'ADMIN')?.id as number;
const userRoleID = role.find(({ name }) => name === 'USER')?.id as number;

await seed.rolePermission([
  ...['user:read:any', 'user:update:own', 'user:delete:any', 'user:ban:any']
    .map(
      (adminRolePermission) =>
        permission.find(({ name }) => name === adminRolePermission)?.id,
    )
    .map((pid) => ({ roleId: adminRoleID, permissionId: pid })),

  ...['user:read:any', 'user:update:own', 'user:delete:own']
    .map(
      (userRolePermission) =>
        permission.find(({ name }) => name === userRolePermission)?.id,
    )
    .map((pid) => ({ roleId: userRoleID, permissionId: pid })),
]);

await seed.user((x) =>
  x(10, {
    id: (ctx) => copycat.uuid(ctx.seed),
    name: (ctx) => copycat.firstName(ctx.seed),
    email: (ctx) => copycat.email(ctx.seed),
    is_banned: (ctx) => copycat.bool(ctx.seed),
  }),
);

console.log('✅ Database seeded successfully!');
process.exit();
