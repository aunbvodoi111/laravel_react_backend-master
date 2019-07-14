<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Cate;
use App\Subcate;
use App\Product;
use App\Unit;
use App\User;
use App\Cart;
use App\Cart_detail;
use App\Mulimage;
use Illuminate\Support\Facades\Auth;
use Log;
class productController extends Controller
{
    //
    public function addProduct (Request $request){
        // dd($request->all());
        $request->validate([
            'name' => 'required|min:2',
        ]);
        $product  = new Product;
        $product->name =  $request->name;
        $product->description =  $request->description;
        $product->price =  $request->price;
        $product->mass =  $request->mass;
        $product->discount =  $request->discount;
        $product->khuyenmai =  'dsadasasd';
        $product->qty =  $request->qty;
        $product->image =  $request->image;
        $product->SubcateId =  $request->SubcateId;
        $product->UserId =  Auth::user()->id;
        $product->UnitId =  $request->UnitId;
        $product->sold =  0;
        $product->CateId =  $request->CateId;
        $product->keyword =  changeTitle($request->name);
        $product->save();
        foreach ($request->images as $file) {
            // dd($file);
            $mulimage  = new Mulimage;
            $mulimage->image =  $file['image'];
            $mulimage->ProductId =  $product->id;
            $mulimage->save();
        }
        return response([
    		'product'=>$product
    	]);
    }

    public function upload(Request $res){
        $file=$res->file;
		$name= $file->getClientOriginalName();
		$file->move("img",$name); 
		return response([
            'result' => $name
        ], 200);
    }
    
    public function editProduct( $id ){
        // dd($id);
        $product = Product::find($id);
        $mulimage = Mulimage::where('ProductId',$id)->get();
        // $file=$res->file;
		// $name= $file->getClientOriginalName();
		// $file->move("img",$name); 
		return response([
            'product' => $product,
            'mulimage' => $mulimage
        ], 200);
    }

    public function updateProduct(Request $request , $id ){
        // dd($request->all());
        $product = Product::find($id);
        
        $product->name =  $request->name;
        $product->description =  $request->description;
        $product->price =  $request->price;
        $product->mass =  $request->mass;
        $product->discount =  $request->discount;
        $product->khuyenmai =  'dsadasasd';
        $product->qty =  $request->qty;
        $product->image =  $request->image;
        $product->SubcateId =  $request->SubcateId;
        $product->UserId =  Auth::user()->id;
        $product->UnitId =  $request->UnitId;
        $product->sold =  0;
        $product->CateId =  $request->CateId;
        $product->keyword =  changeTitle($request->name);
        $product->save();
        $mulimage  = Mulimage::where('ProductId',$id)->get();
        foreach ($mulimage as $file) {
            // dd($file);
            $file->delete();
            // $mulimage  = new Mulimage;
            // $mulimage->image =  $file['image'];
            // $mulimage->ProductId =  $product->id;
            // $mulimage->save();
        }
        foreach ($request->images as $file) {
            // dd($file);
            $mulimage  = new Mulimage;
            $mulimage->image =  $file['image'];
            $mulimage->ProductId =  $product->id;
            $mulimage->save();
        }
    }
    
    public function uploads(Request $res){
        // dd($res->files);
        if ($res->files) {
            foreach ($res->files as $files) {
                foreach ($files as $file) {
                    // dd($file);
                // dd($files[0]);
                $name= $file->getClientOriginalName();
                // dd($name);
                $file->move("img",$name); 
                return response([
                    'result' => $name
                ], 200);
                }
            }
        }
		
    }

    public function updateSubcate (Request $request){
        $request->validate([
            'name' => 'required|min:2',
        ]);
        $cate  = Cate::find($request->id);
        $cate->name =  $request->name;
        $cate->keyword =  changeTitle($request->name);
        $cate->save();
        return response([
    		'cate'=>$cate
    	]);
    }
    public function listData(){
        $cates  = Cate::all();
        $subcates  = Subcate::all();
        $units = Unit::all();
        return response([
            'cates' => $cates,
            'subcates' => $subcates,
            'units' => $units
    	]);
    }
    public function listProduct(){
        $products  = Product::all();

          return response([
            'products' => $products,
    	]);
    }
    public function deleteSubcate( $id ){
        $subcate  = Subcate::find($id);
        $subcate->delete();
        
        return response([
    		'subcate' => $subcate
    	]);
    }
}