export function generateRandomData(role: string) {
  const random = Math.floor(Math.random() * 100000);
  return {
    name: `Abhishek-${Date.now().toString().slice(-5)}`,
    mobile: `9419${random.toString().padStart(6, '0')}`,
    email: `test${random}@mail.com`,
    userId: `user${random}`,
    password: 'Test@123',
    role,
    shopName: `Shop-${random}` // only for Vendor
  };
}

export function getRolesConfig() 
{
  return {
    allRoles: ['Vendor', 'Cashier', 'Settlement', 'Group Leader', 'Sub Admin'],
    rolesNeedingEvent: ['Vendor', 'Cashier', 'Settlement', 'Group Leader', 'Sub Admin']
  };
}
