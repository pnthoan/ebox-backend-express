var mongoose = require('mongoose');
var math = require('mathjs');
var Giay = mongoose.model('GiayModel');
var Hop = mongoose.model('HopModel');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

function getIdxSoluong(sl, sl_range)
{
    var i
    var index = 0
    for(i in sl_range) {
        if (sl_range[i] <= sl) {
            index = i
        }
    }
    if (index <=0) {
        return -1;
    }
    return index;
}

function getTileLoiNhuan(_cost, _sl, _he_so)
{
    var index_sl = getIdxSoluong(_sl, he_so[0])
    if (index_sl < 0) {
        console.log("Khong ban");
        return -1;
    }

    let idx
    let idx_max
    for (idx in _he_so) {zzsasz
        if (idx === 0) continue
        if (_he_so[idx][0] <= _cost) {
            idx_max = idx
        }
    }
    if (idx_max < 1) {
        idx_max = 1
    }

    return _he_so[idx_max][index_sl];
}

function calPrice(_body, _gia_giay, _cong_thuc, _he_so)
{
  console.log(_body)
  console.log(_cong_thuc)
  var ct = _cong_thuc.replace(/d/g, _body.chieudai);
  var ct = ct.replace(/r/g, _body.chieurong);
  var ct = ct.replace(/c/g, _body.chieucao);
  var ct = ct.replace(/g/g, _gia_giay);

  var cost = math.evaluate(ct)
  console.log(ct)
  console.log('pnthoan: ' + cost)

  var giaban = giaBanHopSoLuong(cost, _he_so);
  /*
  //Tinh gia

  //Khuon
  var _gia_khuon_hop_gai = 600000;
  if (_khuon == true)
  {
     if (_soluong >= 300 && _soluong < 500)
     {
        giaban = giaban + _gia_khuon_hop_gai / 300;
     }
     else if (_soluong >= 500 && _soluong < 1000)
     {
        giaban = giaban + _gia_khuon_hop_gai / 500;
     }
     else if (_soluong >= 1000 && _soluong < 2000)
     {
        giaban = giaban + _gia_khuon_hop_gai / 1000;
     }
     else
     {
        giaban = giaban + _gia_khuon_hop_gai / 2000;
     }
  }
  //Mau in
  giaban = giaban + giaBanHopGaiMauIn(cost, _soluongmau);
  giaban = Math.round(giaban);
*/
  return giaban;
}

/* GET /api/giay */
module.exports.Calculate = function (req, res) {
    console.log("Calculate function")
    // const {loaihop, loaigiay, chieudai, chieurong, chieucao, soluong, giakhuon} = req.body
    return Giay.find({ma_giay: req.body.loaigiay})
   .exec(function(err, giay) {
        if (!giay) {
            return null;
        } else if (err) {
            return null;
        }
        
        return Hop.find({loai_hop :req.body.loaihop})
       .exec(function(err, hop) {
            if (!hop) {
                sendJSONresponse(res, 404, {
                    "message": "hopId not found"
                });
                return;
            } else if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            const {so_lop, don_gia} = giay[0]
            const {cong_thuc} = hop[0]

            let ele
            let found = false
            // console.log(JSON.stringify(hop[0].loi_nhuan))
            for (ele of hop[0].loi_nhuan) {
                // console.log(JSON.stringify(ele))
                if (parseInt(ele.so_lop) === 0 || parseInt(ele.so_lop) === parseInt(so_lop)) {
                    found = true
                    break
                }
            }
            if (!found) {
                sendJSONresponse(res, 404, {
                    "message": "Not Found So Lop"
                });
                return;
            }
            // console.log(JSON.stringify({so_lop,
            //                             don_gia,
            //                             cong_thuc,
            //                             heso: ele.he_so}))
            var gia = calPrice(req.body, don_gia, cong_thuc, ele.he_so);
            sendJSONresponse(res, 200, {gia: gia});
        });
    })
};