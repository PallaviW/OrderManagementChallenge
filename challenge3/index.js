
var getOrdersPricing = function(orders) {

var text;
var orderNumber;
var totalOrderPrice;
var ordersFinal = [];



for(var i = 0 ; i< orders.length; i++){

     var orderTotal = 0;
     var eachOrder= {};
     var orderItemPrice = 0;

		orderNumber = orders[i].order_number ;
		eachOrder["order number"] = orderNumber;
 		for(var k = 0 ; k <  orders[i].order_items.length ; k++){

			if(orders[i].order_items[k].type == "Real Property Recording"){
                  
         orderItemPrice = orderItemPrice + (Math.round(26.00) + (orders[i].order_items[k].pages * Math.round(1.00))) ;
          
         orderTotal = orderTotal + (Math.round(26.00) + (orders[i].order_items[k].pages * Math.round(1.00)));
         eachOrder["Real Property Recording"] = orderItemPrice ;
          
          }else{
          	
            orderItemPrice = orderItemPrice + Math.round(23.00);
            orderTotal = orderTotal + Math.round(23.00);
            eachOrder["Birth Certificate"] = orderItemPrice;
            
          }
          
          if(k == (orders[i].order_items.length - 1)){
          	eachOrder["Order Total"] = orderTotal;
           }
          
        }
      ordersFinal.push(eachOrder);

}

return JSON.stringify(ordersFinal);

}



var getOrdersDistributions = function(orders,fees) {

var ordersFinal = [];

	for(var i = 0 ; i< orders.length; i++){
		var eachOrder= {};
		var distRPR = 0;
		var distBC = 0;

		orderNumber = orders[i].order_number ;
		eachOrder["order number"] = orderNumber;
 		for(var k = 0 ; k <  orders[i].order_items.length ; k++){
 			if(orders[i].order_items[k].type == "Real Property Recording"){

 				for(var l=0;l<fees[0].distributions.length;l++){

					distRPR = distRPR + Math.round(fees[0].distributions[l].amount);
 				}


 			}else{

 				 for(var m=0;m<fees[1].distributions.length;m++){

 				 	distBC = distBC + Math.round(fees[1].distributions[m].amount);
 				 }
 			}

 			eachOrder["total distributions"] = distRPR + distBC ;

 		}
 		ordersFinal.push(eachOrder);

	}

	return JSON.stringify(ordersFinal);

}


module.exports = {

	getOrdersPricing : getOrdersPricing,
	getOrdersDistributions :getOrdersDistributions
};



