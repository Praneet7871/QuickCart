import {getAuth} from "@clerk/nextjs/server";
import authSeller from "@/lib/auth-seller";
import {NextResponse} from "next/server";
import connectDB from "@/config/db";

export async function GET(request) {
try{
    const {userId} = getAuth(request);
    const isSeller = await authSeller(userId);
    if(!isSeller) {
        return Nextresponse.json({success: false, message: "Unauthorized"});

        await connectDB()
        const orders = await Order.find({}).populate('iterms.product')
        return NextResponse.json({success: true, orders});
    }
}
catch (error) {
            return Nextresponse.json({success: false, message: error.message});

}
}