import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from 'bcrypt';
import z from 'zod';
import generateUserId from "../../utility/generateUserId";


const invalid_type_error = 'Invalid type provided for this field';
const required_error = 'This field cannot be blank';

export const userSchema = z.object({
  firstname: z.string({ invalid_type_error, required_error }).min(1, 'Value is too short'),
  lastname: z.string({ invalid_type_error, required_error }).min(1, 'Value is too short'),
  email: z.string({ invalid_type_error, required_error }).email('Please provide a valid email').min(1, 'Value is too short'),
  password: z.string({ invalid_type_error, required_error }).min(6, 'Password is too short'),
  role: z.string().refine(value => value === 'admin' || value === 'seeker', { message: 'Invalid role' })

});

export async function handler(req: Request){
  try {
    const body = await req.json();
    const { email,firstname, lastname, password, role} = userSchema.parse(body);

    const userExist = await db.user.findUnique({
      where: { email: email}
    });
    if(userExist){
      return NextResponse.json({ user: null, message: "User Exists"}, {status: 409})
    }

    const userid = generateUserId(firstname, lastname);

    const userExistId = await db.user.findUnique({
      where: { userid: userid}
    });
    if(userExistId){
      return NextResponse.json({ user: null, message: "User Exists"}, {status: 409})
    }

    const hidePassword = await hash(password, 10)
    const newUser = await db.user.create({
      data: {
        email,
        userid, 
        firstname,
        lastname,
        role,
        password: hidePassword
      }
    })
    const { password: newUserPassword, ...rest } = newUser;
    return NextResponse.json({user: rest, message: "User created successfully"}, {status: 201});

  } catch (error){
    return NextResponse.json({message: "ERROR 101"}, {status: 201});
  }
}

export { handler as POST };
