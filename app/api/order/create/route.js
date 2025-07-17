import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import Product from "@/models/Product";
import { inngest } from "@/config/inngest";
import User from "@/models/users";



export async function POST(request) {
    try {
        const {userId}=getAuth(request);
        const{adress,items}=await request.json();

        if(items.length===0){
            return NextResponse.json({success:false,message:"Invalid data"});
        }
        const amount = await items.reduce(async(accessedDynamicData,item)=>{
            const product = await Product.findById(item.product);
            return acc+product.offerPrice * item.quantity;
        },0)

        await inngest .send({
            name:'order/created',
            data:{
                userId,items,amount: amount+Math.floor(amount*0.02),
                date:Date.now()
            }
        })
        const user = await User .findById(userId);
        user.cartItems = {};
        await user.save();
        return NextResponse.json({success:true,message:"Order placed successfully"});
    } catch (error) {
        console.error(error);
        return NextResponse.json({success:false,message:error.message});
    }
}