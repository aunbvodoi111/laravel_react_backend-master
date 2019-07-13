<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    //
    protected $table = 'addresses';
    public function province(){
        return $this->hasOne('App\Provinces', 'id', 'ProvinceId');
    }
    public function district(){
        return $this->hasOne('App\Districts', 'id', 'DistrictId');
    }
}
