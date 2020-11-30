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
    // console.log(sl_range)
    var i
    var index = 0
    for(i in sl_range[0]) {
        if(i === 0) continue
        if (sl_range[0][i] <= sl) {
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
    var index_sl = getIdxSoluong(_sl, _he_so)
    if (index_sl < 0) {
        console.log("Khong ban");
        return -1;
    }

    // console.log("index_sl = " + index_sl)
    let idx
    let idx_max = 0
    for (idx in _he_so) {
        if (idx === 0) continue
        if (_he_so[idx][0] <= _cost) {
            idx_max = idx
        }
    }
    if (idx_max < 1) {
        idx_max = 1
    }
    // console.log("idx_max = " + idx_max)
    return _he_so[idx_max][index_sl];
}

function calPrice(_body, _gia_giay, _cong_thuc, _he_so)
{
  // console.log("BODY: " + JSON.stringify(_body))
  // console.log("Heso: " + _he_so)

  var ct = _cong_thuc.replace(/d/g, _body.chieudai);
  var ct = ct.replace(/r/g, _body.chieurong);
  var ct = ct.replace(/c/g, _body.chieucao);
  var ct = ct.replace(/g/g, _gia_giay);

  var cost = math.evaluate(ct)
  // console.log(ct)

  //Tinh gia
  var ti_le = getTileLoiNhuan(cost, _body.soluong, JSON.parse(_he_so));
  if (ti_le < 0) {
    return -1;
  }
  var giaban = ti_le * cost
  // console.log("giaban: " + giaban)
  //Khuon
  if (_body.khuon.iskhuon === true) {
    console.log("Has khuon")
    giaban = giaban + _body.khuon.giakhuon / _body.soluong
  }
  // console.log("Sau tinh khuon: " + giaban)
  //Mau in
  if (_body.in.isprint === true) {
    console.log("Has print!")
    giaban = giaban + 300 * _body.in.soluongmau;
  }
  // console.log("Sau tinh In: " + giaban)
  giaban = Math.round(giaban);

  return giaban;
}

/* GET /api/giay */
module.exports.Calculate = function (req, res) {
    // const {loaihop, loaigiay, chieudai, chieurong, chieucao, soluong, giakhuon} = req.body
    // console.log(JSON.stringify(req.body))
    return Giay.find({ma_giay: req.body.loaigiay})
   .exec(function(err, giay) {
        if (giay.length <= 0) {
            sendJSONresponse(res, 404, {"message": "giayid not found"});
            return null;
        } else if (err) {
            sendJSONresponse(res, 404, {"message": "giayid error"});
            return null;
        }

        return Hop.find({loai_hop :req.body.loaihop})
       .exec(function(err, hop) {
            if (hop.length <= 0) {
                sendJSONresponse(res, 404, {
                    "message": "hopId not found"
                });
                return null;
            } else if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
                return null;
            }
            // console.log(JSON.stringify(giay))
            // console.log(JSON.stringify(hop))

            const {so_lop, don_gia} = giay[0]
            const {cong_thuc} = hop[0]

            let ele
            let found = false
            // console.log("HOP: " + JSON.stringify(hop))
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
                return null;
            }
            var gia = calPrice(req.body, don_gia, cong_thuc, ele.he_so);
            if (gia < 0) {
              sendJSONresponse(res, 400, {"result" : "Calculate FAILED"})
            } else {
              sendJSONresponse(res, 200, {gia: gia});
            }
        });
    })
};
