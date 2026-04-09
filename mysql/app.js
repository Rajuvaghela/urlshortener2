import mysql from "mysql2/promise";

// 1: to connect to mysql server

const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Raju@123",
  database: "mysql_db",
});

console.log("Mysql Connected successfully!");

// await db.execute(`
//         create table users(
//         id int auto_increment primary key,
//         name varchar(100) not null ,
//         email varchar(100) not null unique);
//     `);

//console.log(await await mysql_db.execute(`create database mysql_db`));



//await db.execute(`insert into users(name, email) values (?,?)`,['laxmi','laxmi@gmail.com']);

// const values = [
//   ["Alice","alice@gmail.com"],
//   ["Lakho","lakho@gmail.com"],
//   ["bob","bob@gmail.com"],
//   ["emma","emma@gmail.com"],
// ];

// await db.query(`insert into users (name,email) values ?`,[values]);


// try {
//   const [rows] = await db.execute(`update users set name ='rajubhai' where email = 'raj@gmail.com'`);
// } catch (error) {
//   console.error(error);
  
// }



// try {
//   const [rows] = await db.execute(`delete from users where email = 'raj@gmail.com'`);
// } catch (error) {
//   console.error(error);
  
// }


try {
  const [rows] = await db.execute(`update users set name =? where email =?`,["laxmi bavliya","laxmi@gmail.com"]);
} catch (error) {
  console.error(error);
  
}


const [rows] = await db.execute(`select * from users`);

console.log(rows);