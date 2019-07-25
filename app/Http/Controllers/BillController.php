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
        $orders = Bill::where('UserIdSaler', $auth->id)->with('bills_detail.product')->with('user')->orderBy('id','DESC')->get();
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
    public function queryDateBill(Request $res){
        // dd($res->status);
        $auth = Auth::User();
        if($res->status == -1){
            $orders = Bill::whereBetween('created_at', [$res->dateStart, $res->dateEnd])
            ->where('UserIdSaler', $auth->id)->with('bills_detail.product')->with('user')->orderBy('id','DESC')->get();
        }else if($res->status == 0){
            $orders = Bill::whereBetween('created_at', [$res->dateStart, $res->dateEnd])->where('status',0)
            ->where('UserIdSaler', $auth->id)->with('bills_detail.product')->with('user')->orderBy('id','DESC')->get();
        }else if($res->status == 1){
            $orders = Bill::whereBetween('created_at', [$res->dateStart, $res->dateEnd])->where('status',1)
            ->where('UserIdSaler', $auth->id)->with('bills_detail.product')->with('user')->orderBy('id','DESC')->get();
        }else if($res->status == 2){
            $orders = Bill::whereBetween('created_at', [$res->dateStart, $res->dateEnd])->where('status',2)
            ->where('UserIdSaler', $auth->id)->with('bills_detail.product')->with('user')->orderBy('id','DESC')->get();
        }else if($res->status == 3){
            $orders = Bill::whereBetween('created_at', [$res->dateStart, $res->dateEnd])->where('status',3)
            ->where('UserIdSaler', $auth->id)->with('bills_detail.product')->with('user')->orderBy('id','DESC')->get();
        }else if($res->status == 4){
            $orders = Bill::whereBetween('created_at', [$res->dateStart, $res->dateEnd])->where('status',4)
            ->where('UserIdSaler', $auth->id)->with('bills_detail.product')->with('user')->orderBy('id','DESC')->get();
        }
        
        return response([
            'orders' => $orders
        ]);
    }
    public function editBill( Request $res,$id){
        $bill = Bill::where('id',$id)->with('bills_detail.product')->with('user')->first();
        // dd( $bill);
        
        
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
        $statusBill = $bill->status;
        $title = 'Xác nhận đơn hàng';
        $content = 'Đon hàng của bạn đã được xác nhận ';
        if($statusBill == 1){
            $title = 'Đơn hàng đã được giao cho đơn vị vận chuyển';
            $content = 'Đon hàng của bạn đã được giao cho đơn vị vận chuyển vui lòng nhấn kiểm tra trạng thái đơn hàng  ';
        }else if($statusBill == 2 ){
            $title = 'Đơn hàng đã giao hoàn thành ';
            $content = 'Đon hàng của bạn đã được giao hoàn thành . Vui lòng vào xác nhận là bạn đã nhận được hàng .Xin cảm ơn !  ';
        }else if( $statusBill == 1){
            
        }
        $dateorder = new Dateorder;
        $dateorder->BillId = $id;
        $dateorder->save(); 
        
        $notification = new Notification;
        $notification->UserIdSaler = $bill->UserIdSaler;
        $notification->BillId = $bill->id;
        $notification->UserIdBuyer = $bill->UserIdBuyer;
        $notification->title = $title;
        $notification->content = $content;
        $notification->status = 0 ;
        $notification->save();
        $data=
        [
            'name' => 'anhquy',
            'bill'=>$bill,    
            'email'=>$bill->user->email      
        ];
        Mail::send('mail.mail',$data,function($message) use($data){
        $message->from('phamquycntta@gmail.com','anhquy');
        $message->to('phamqucntta11@gmail.com');
        $message->subject($data['name']);
        });
            return response([
                'data' => $data
            ]);
    }
}