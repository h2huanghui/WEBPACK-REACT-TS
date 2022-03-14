import React, {Fragment} from 'react';
import currency,{usUnit} from "../../utils/currency";
import '@/styles/components/FormatDoller/index.less';

/*价格负数/价格区间/正常价格 例如： -US$ 100 / US$ 100-200 / US$ 100*/
export default function FormatDoller({
   startPrice, //开始价格(默认价格)
   endPrice, //结束价格(非价格区间可无此参数)
   style, //自定义样式
   settings
  }){
  startPrice = Number(startPrice);
  endPrice = Number(endPrice);
    return (
        <div className={style ? ("currencyPrice " + style) : "currencyPrice"}>
          {parseFloat(startPrice).toString() != "NaN" ? (
            <Fragment>
              {(startPrice === endPrice || !endPrice) ? (
                <Fragment>
                  {startPrice>=0?'':'-'}<span className="currencyUnit">{usUnit}&nbsp;</span>{currency(Math.abs(startPrice),settings).format()}
                </Fragment>
              ):(
                <Fragment>
                  <span className="currencyUnit">{usUnit}&nbsp;</span>{currency(Math.abs(startPrice),settings).format()}-{currency(Math.abs(endPrice),settings).format()}
                </Fragment>
              )}
            </Fragment>
          ):(
            <Fragment>
              <span className="currencyUnit">{usUnit}&nbsp;</span>{startPrice}
            </Fragment>
          )}
        </div>
    )
}
