<p><{{ $bill->name }}/p>
<!-- @foreach($bill as $name) -->
<!-- @foreach($name->bills_detail as $file)
<p>$name->status</p>
    @if( $name->status == 1 )
        <p>Đơn hàng của bạn đã được xác nhân</p>
    @elseif( $name->status == 2 )
        <p>Đơn hàng của bạn đã được giao cho đơn vị vận chuyển</p>
    @elseif( $name->status == 3 )
        <p>Đơn hàng của bạn đã được giao thành công xin vùi lòng click vào link để xác nhận</p>
    @elseif( $name->status == 4 )
        <p>Đơn hàng của bạn bị người bán hủy .Nhấn vào link để liên hệ với người  bán </p>
    @endif
    @foreach($file->product as $item)
        <p>Tên sản phẩm : {{ $item->name }}</p>
        <p>Gía bán :{{ $item->price }}</p>
        <p>Số lượng :{{ $file->qty }}</p>
    @endforeach
    @endforeach -->
<!-- @endforeach -->