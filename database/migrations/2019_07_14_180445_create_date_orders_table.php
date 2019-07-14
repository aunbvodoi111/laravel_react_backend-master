<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('date_orders', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('BillId');
            $table->foreign('BillId')->references('id')->on('bills')->onDelete('cascade');
            $table->integer('UserId')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('date_orders');
    }
}
