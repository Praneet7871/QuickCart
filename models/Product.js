import mongoose from 'mongoose';


const productSchema = new mongoose.Schema({
  userId : {type:String , required:true,ref :"user"},
  name:{type:String , required:true},
  description :{type:String , required:true},
  price:{type:Number , required:true},
  offerPrice:{type:Number , required:true},
  image:{type:Array , required:true},
   models: [String],
modelNames: [String], // 💥 NEW FIELD
  category:{type:String , required:true},
  date:{type:Number,required:true},
});



const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;