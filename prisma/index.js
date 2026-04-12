import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // insert single record
  // const user = await prisma.user.create({
  //   data: {
  //     name: "Raju",
  //     email: "raju111@gmail.com",
  //   },
  // });

  // insert multiple
  //   const users = await prisma.user.createMany({
  //   data: [
  //     { name: "Alice1", email: "Alice10@gmail.com",},
  //        { name: "Bob1", email: "bom10@gmail.com",}
  //   ],
  // });

  //const users = await prisma.user.findMany();
  // const users = await prisma.user.findUnique({
  //   where: { id: 13 },
  // });

  // const updatedUser =await prisma.user.update({
  //   where:{id:13},
  //   data:{name:"Bob"}
  // })

  // const updatedUser = await prisma.user.updateMany({
  //   where: { id: 13 },
  //   data: { name: "Bob the builder" },
  // });

  const deletedUser = await prisma.user.delete({
    where: { id: 12 },
  });

  console.log(deletedUser);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
