import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import {getAuth} from "@clerk/nextjs/server";
import User from "@/models/users";

export async function GET(request){
    try {
        const {userId} = getAuth(request);
        await connectDB();
        const user = await User.findById(userId)
        const {cartItems} = user;
        return NextResponse({success:true,cartItems})
    } catch (error) {
          return NextResponse({success:false,message:error.message})
    }
}