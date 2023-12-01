import { PrismaClient } from "@prisma/client";
const prismaClients = {
    root: new PrismaClient(),
};
export async function getClientByTenantId(tenantId) {
    if (!tenantId) {
        return prismaClients.root;
    }
    ;
    const findTenant = await prismaClients.root?.tenant.findUnique({
        where: { tenantId: tenantId },
    });
    if (!findTenant) {
        return prismaClients.root;
    }
    ;
    prismaClients[tenantId] = new PrismaClient({
        datasourceUrl: findTenant.connectionString
    });
    return prismaClients[tenantId];
}
;
