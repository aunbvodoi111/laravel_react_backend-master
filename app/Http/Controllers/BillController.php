<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Cate;
use App\Subcate;
use App\Product;
use App\Unit;
use App\User;
use App\Bill;
use App\Bill_detail; 
use App\Districts;
use App\Dateorder;
use App\Rating;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Mail; 
use App\Notification;
class BillController extends Controller
{
    //
    public function list(){
       
        $auth = Auth::User();
        $orders = Bill::where('UserIdSaler', $auth->id)->with('bills_detail.product')->with('user')->orderBy('id')->get();
        // $idCart = $cart->UserIdSaler;
        // if (Auth::check()) {
        //     dd(Auth::user());
        // }
        // $users = Cart::with(['carts_detail' => function ($query) {
        //     // $idCart = $cart->UserIdSaler;
        //     $query->where('UserIdSaler', 1)::with('products');
        // }])->get();
        // $orders = Cart::with('user')->with('carts_detail.products')->where('UserIdSaler', $idCart)->first();
        return response([
            'orders'=>$orders
        ]);
    }
    public function orderDetail($id){
        $districts = Districts::all();
        $ordersDetail = Bill::where('id', $id)->with('address.district')->with('address.province')->with('bills_detail.product')->with('user')->first();
        return response([
            'ordersDetail'=>$ordersDetail,
            'districts' => $districts
        ]);
    }
    public function sendMail(){
        $data=
            [
                'name'=>'name',
                'date_order'=>'name',
                'sum'=>'name',
                
            ];
        Mail::send('mail.mail',$data,function($message) use($data){
            $message->from('phamquycntta@gmail.com','anhquy');
            $message->to('phamqucntta11@gmail.com');
            $message->subject('ok');
            });
            return response([
                'data' => $data
            ]);
    }
    public function editBill( Request $res,$id){
        $bill = Bill::where('id',$id)->with('bills_detail.product')->first();
        // dd( $bill->id);
        
        
        $bill->status = $bill->status + 1;
        // dd($id);
        $bill->save();
        if($bill->status == 3){
            foreach($bill->bills_detail as $bill){
                // dd($bill);
                $product = Product::find( $bill->Product_Id );
                // dd($product);
                $product->sold = $product->sold + $bill->qty;
                $product->save();
                $rating = Rating::where('ProductId',$bill->Product_Id )->where('UserId', $bill->UserIdBuyer )->first();
                if(!is_null(($rating))){
                    $rating->checkBuy =  1;
                    $rating->save();
                }
            }
        }
        $dateorder = new Dateorder;
        $dateorder->BillId = $id;
        $dateorder->save(); 
        
        $notification = new Notification;
        $notification->UserIdSaler = $bill->UserIdSaler;
        $notification->BillId = $bill->id;
        $notification->UserIdBuyer = $bill->UserIdBuyer;
        $notification->content = 'Đon hàng của bạn đã được xác nhận ';
        $notification->save();
        $data=
            [
                'name'=>'name',
                'date_order'=>'name',
                'sum'=>'name',
                
            ];
        Mail::send('mail.mail',$data,function($message) use($data){
            $message->from('phamquycntta@gmail.com','anhquy');
            $message->to('phamqucntta11@gmail.com');
            $message->subject('ok');
            });
            return response([
                'data' => $data
            ]);
    }
}