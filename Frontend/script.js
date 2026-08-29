const API_URL = "https://pizza-odering-system.onrender.com/";
window.googleMapsReady=false;
window.initPizzaHouseGoogleMaps=function(){
  window.googleMapsReady=true;
  if(typeof showHomeTrackingAfterOrder==="function") showHomeTrackingAfterOrder();
};

/* ---------------- Data ---------------- */
const PIZZAS = [
  {id:'p1', name:'Margherita', image:'https://loremflickr.com/900/650/pizza,food?lock=1001', veg:true, desc:'Fresh tomato, mozzarella & basil', rating:4.2, price:199, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p2', name:'Veggie Supreme', image:'https://loremflickr.com/900/650/pizza,food?lock=1002', veg:true, desc:'Bell pepper, onion, corn & olives', rating:4.3, price:249, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p3', name:'Paneer Tikka', image:'https://loremflickr.com/900/650/pizza,food?lock=1003', veg:true, desc:'Smoky paneer, capsicum & onion', rating:4.4, price:279, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p4', name:'Farmhouse', image:'https://loremflickr.com/900/650/pizza,food?lock=1004', veg:true, desc:'Mushroom, sweetcorn, capsicum & tomato', rating:4.5, price:259, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p5', name:'Pepperoni Blast', image:'https://loremflickr.com/900/650/pizza,food?lock=1005', veg:false, desc:'Loaded pepperoni & mozzarella', rating:4.6, price:329, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p6', name:'Chicken Tikka', image:'https://loremflickr.com/900/650/pizza,food?lock=1006', veg:false, desc:'Tandoori chicken, onion & peppers', rating:4.7, price:349, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p7', name:'BBQ Chicken', image:'https://loremflickr.com/900/650/pizza,food?lock=1007', veg:false, desc:'Smoky BBQ chicken with red onion', rating:4.8, price:339, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p8', name:'Cheese Burst', image:'https://loremflickr.com/900/650/pizza,food?lock=1008', veg:true, desc:'Molten mozzarella core, extra cheese', rating:4.9, price:299, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p9', name:'Margherita Special 9', image:'https://loremflickr.com/900/650/pizza,food?lock=1009', veg:true, desc:'Fresh tomato, mozzarella & basil', rating:4.2, price:209, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p10', name:'Veggie Supreme Special 10', image:'https://loremflickr.com/900/650/pizza,food?lock=1010', veg:true, desc:'Bell pepper, onion, corn & olives', rating:4.3, price:259, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p11', name:'Paneer Tikka Special 11', image:'https://loremflickr.com/900/650/pizza,food?lock=1011', veg:true, desc:'Smoky paneer, capsicum & onion', rating:4.4, price:289, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p12', name:'Farmhouse Special 12', image:'https://loremflickr.com/900/650/pizza,food?lock=1012', veg:true, desc:'Mushroom, sweetcorn, capsicum & tomato', rating:4.5, price:269, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p13', name:'Pepperoni Blast Special 13', image:'https://loremflickr.com/900/650/pizza,food?lock=1013', veg:false, desc:'Loaded pepperoni & mozzarella', rating:4.6, price:339, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p14', name:'Chicken Tikka Special 14', image:'https://loremflickr.com/900/650/pizza,food?lock=1014', veg:false, desc:'Tandoori chicken, onion & peppers', rating:4.7, price:359, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p15', name:'BBQ Chicken Special 15', image:'https://loremflickr.com/900/650/pizza,food?lock=1015', veg:false, desc:'Smoky BBQ chicken with red onion', rating:4.8, price:349, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p16', name:'Cheese Burst Special 16', image:'https://loremflickr.com/900/650/pizza,food?lock=1016', veg:true, desc:'Molten mozzarella core, extra cheese', rating:4.9, price:309, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p17', name:'Margherita Special 17', image:'https://loremflickr.com/900/650/pizza,food?lock=1017', veg:true, desc:'Fresh tomato, mozzarella & basil', rating:4.2, price:219, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p18', name:'Veggie Supreme Special 18', image:'https://loremflickr.com/900/650/pizza,food?lock=1018', veg:true, desc:'Bell pepper, onion, corn & olives', rating:4.3, price:269, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p19', name:'Paneer Tikka Special 19', image:'https://loremflickr.com/900/650/pizza,food?lock=1019', veg:true, desc:'Smoky paneer, capsicum & onion', rating:4.4, price:299, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p20', name:'Farmhouse Special 20', image:'https://loremflickr.com/900/650/pizza,food?lock=1020', veg:true, desc:'Mushroom, sweetcorn, capsicum & tomato', rating:4.5, price:279, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p21', name:'Pepperoni Blast Special 21', image:'https://loremflickr.com/900/650/pizza,food?lock=1021', veg:false, desc:'Loaded pepperoni & mozzarella', rating:4.6, price:349, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p22', name:'Chicken Tikka Special 22', image:'https://loremflickr.com/900/650/pizza,food?lock=1022', veg:false, desc:'Tandoori chicken, onion & peppers', rating:4.7, price:369, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p23', name:'BBQ Chicken Special 23', image:'https://loremflickr.com/900/650/pizza,food?lock=1023', veg:false, desc:'Smoky BBQ chicken with red onion', rating:4.8, price:359, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p24', name:'Cheese Burst Special 24', image:'https://loremflickr.com/900/650/pizza,food?lock=1024', veg:true, desc:'Molten mozzarella core, extra cheese', rating:4.9, price:319, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p25', name:'Margherita Special 25', image:'https://loremflickr.com/900/650/pizza,food?lock=1025', veg:true, desc:'Fresh tomato, mozzarella & basil', rating:4.2, price:229, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p26', name:'Veggie Supreme Special 26', image:'https://loremflickr.com/900/650/pizza,food?lock=1026', veg:true, desc:'Bell pepper, onion, corn & olives', rating:4.3, price:279, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p27', name:'Paneer Tikka Special 27', image:'https://loremflickr.com/900/650/pizza,food?lock=1027', veg:true, desc:'Smoky paneer, capsicum & onion', rating:4.4, price:309, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p28', name:'Farmhouse Special 28', image:'https://loremflickr.com/900/650/pizza,food?lock=1028', veg:true, desc:'Mushroom, sweetcorn, capsicum & tomato', rating:4.5, price:289, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p29', name:'Pepperoni Blast Special 29', image:'https://loremflickr.com/900/650/pizza,food?lock=1029', veg:false, desc:'Loaded pepperoni & mozzarella', rating:4.6, price:359, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p30', name:'Chicken Tikka Special 30', image:'https://loremflickr.com/900/650/pizza,food?lock=1030', veg:false, desc:'Tandoori chicken, onion & peppers', rating:4.7, price:379, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p31', name:'BBQ Chicken Special 31', image:'https://loremflickr.com/900/650/pizza,food?lock=1031', veg:false, desc:'Smoky BBQ chicken with red onion', rating:4.8, price:369, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p32', name:'Cheese Burst Special 32', image:'https://loremflickr.com/900/650/pizza,food?lock=1032', veg:true, desc:'Molten mozzarella core, extra cheese', rating:4.9, price:329, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p33', name:'Margherita Special 33', image:'https://loremflickr.com/900/650/pizza,food?lock=1033', veg:true, desc:'Fresh tomato, mozzarella & basil', rating:4.2, price:239, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p34', name:'Veggie Supreme Special 34', image:'https://loremflickr.com/900/650/pizza,food?lock=1034', veg:true, desc:'Bell pepper, onion, corn & olives', rating:4.3, price:289, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p35', name:'Paneer Tikka Special 35', image:'https://loremflickr.com/900/650/pizza,food?lock=1035', veg:true, desc:'Smoky paneer, capsicum & onion', rating:4.4, price:319, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p36', name:'Farmhouse Special 36', image:'https://loremflickr.com/900/650/pizza,food?lock=1036', veg:true, desc:'Mushroom, sweetcorn, capsicum & tomato', rating:4.5, price:299, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p37', name:'Pepperoni Blast Special 37', image:'https://loremflickr.com/900/650/pizza,food?lock=1037', veg:false, desc:'Loaded pepperoni & mozzarella', rating:4.6, price:369, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p38', name:'Chicken Tikka Special 38', image:'https://loremflickr.com/900/650/pizza,food?lock=1038', veg:false, desc:'Tandoori chicken, onion & peppers', rating:4.7, price:389, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p39', name:'BBQ Chicken Special 39', image:'https://loremflickr.com/900/650/pizza,food?lock=1039', veg:false, desc:'Smoky BBQ chicken with red onion', rating:4.8, price:379, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p40', name:'Cheese Burst Special 40', image:'https://loremflickr.com/900/650/pizza,food?lock=1040', veg:true, desc:'Molten mozzarella core, extra cheese', rating:4.9, price:339, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p41', name:'Margherita Special 41', image:'https://loremflickr.com/900/650/pizza,food?lock=1041', veg:true, desc:'Fresh tomato, mozzarella & basil', rating:4.2, price:249, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p42', name:'Veggie Supreme Special 42', image:'https://loremflickr.com/900/650/pizza,food?lock=1042', veg:true, desc:'Bell pepper, onion, corn & olives', rating:4.3, price:299, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p43', name:'Paneer Tikka Special 43', image:'https://loremflickr.com/900/650/pizza,food?lock=1043', veg:true, desc:'Smoky paneer, capsicum & onion', rating:4.4, price:329, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p44', name:'Farmhouse Special 44', image:'https://loremflickr.com/900/650/pizza,food?lock=1044', veg:true, desc:'Mushroom, sweetcorn, capsicum & tomato', rating:4.5, price:309, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p45', name:'Pepperoni Blast Special 45', image:'https://loremflickr.com/900/650/pizza,food?lock=1045', veg:false, desc:'Loaded pepperoni & mozzarella', rating:4.6, price:379, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p46', name:'Chicken Tikka Special 46', image:'https://loremflickr.com/900/650/pizza,food?lock=1046', veg:false, desc:'Tandoori chicken, onion & peppers', rating:4.7, price:399, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p47', name:'BBQ Chicken Special 47', image:'https://loremflickr.com/900/650/pizza,food?lock=1047', veg:false, desc:'Smoky BBQ chicken with red onion', rating:4.8, price:389, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p48', name:'Cheese Burst Special 48', image:'https://loremflickr.com/900/650/pizza,food?lock=1048', veg:true, desc:'Molten mozzarella core, extra cheese', rating:4.9, price:349, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p49', name:'Margherita Special 49', image:'https://loremflickr.com/900/650/pizza,food?lock=1049', veg:true, desc:'Fresh tomato, mozzarella & basil', rating:4.2, price:259, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p50', name:'Veggie Supreme Special 50', image:'https://loremflickr.com/900/650/pizza,food?lock=1050', veg:true, desc:'Bell pepper, onion, corn & olives', rating:4.3, price:309, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p51', name:'Paneer Tikka Special 51', image:'https://loremflickr.com/900/650/pizza,food?lock=1051', veg:true, desc:'Smoky paneer, capsicum & onion', rating:4.4, price:339, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p52', name:'Farmhouse Special 52', image:'https://loremflickr.com/900/650/pizza,food?lock=1052', veg:true, desc:'Mushroom, sweetcorn, capsicum & tomato', rating:4.5, price:319, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p53', name:'Pepperoni Blast Special 53', image:'https://loremflickr.com/900/650/pizza,food?lock=1053', veg:false, desc:'Loaded pepperoni & mozzarella', rating:4.6, price:389, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p54', name:'Chicken Tikka Special 54', image:'https://loremflickr.com/900/650/pizza,food?lock=1054', veg:false, desc:'Tandoori chicken, onion & peppers', rating:4.7, price:409, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p55', name:'BBQ Chicken Special 55', image:'https://loremflickr.com/900/650/pizza,food?lock=1055', veg:false, desc:'Smoky BBQ chicken with red onion', rating:4.8, price:399, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p56', name:'Cheese Burst Special 56', image:'https://loremflickr.com/900/650/pizza,food?lock=1056', veg:true, desc:'Molten mozzarella core, extra cheese', rating:4.9, price:359, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p57', name:'Margherita Special 57', image:'https://loremflickr.com/900/650/pizza,food?lock=1057', veg:true, desc:'Fresh tomato, mozzarella & basil', rating:4.2, price:269, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p58', name:'Veggie Supreme Special 58', image:'https://loremflickr.com/900/650/pizza,food?lock=1058', veg:true, desc:'Bell pepper, onion, corn & olives', rating:4.3, price:319, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p59', name:'Paneer Tikka Special 59', image:'https://loremflickr.com/900/650/pizza,food?lock=1059', veg:true, desc:'Smoky paneer, capsicum & onion', rating:4.4, price:349, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p60', name:'Farmhouse Special 60', image:'https://loremflickr.com/900/650/pizza,food?lock=1060', veg:true, desc:'Mushroom, sweetcorn, capsicum & tomato', rating:4.5, price:329, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p61', name:'Pepperoni Blast Special 61', image:'https://loremflickr.com/900/650/pizza,food?lock=1061', veg:false, desc:'Loaded pepperoni & mozzarella', rating:4.6, price:399, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p62', name:'Chicken Tikka Special 62', image:'https://loremflickr.com/900/650/pizza,food?lock=1062', veg:false, desc:'Tandoori chicken, onion & peppers', rating:4.7, price:419, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p63', name:'BBQ Chicken Special 63', image:'https://loremflickr.com/900/650/pizza,food?lock=1063', veg:false, desc:'Smoky BBQ chicken with red onion', rating:4.8, price:409, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p64', name:'Cheese Burst Special 64', image:'https://loremflickr.com/900/650/pizza,food?lock=1064', veg:true, desc:'Molten mozzarella core, extra cheese', rating:4.9, price:369, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p65', name:'Margherita Special 65', image:'https://loremflickr.com/900/650/pizza,food?lock=1065', veg:true, desc:'Fresh tomato, mozzarella & basil', rating:4.2, price:279, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p66', name:'Veggie Supreme Special 66', image:'https://loremflickr.com/900/650/pizza,food?lock=1066', veg:true, desc:'Bell pepper, onion, corn & olives', rating:4.3, price:329, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p67', name:'Paneer Tikka Special 67', image:'https://loremflickr.com/900/650/pizza,food?lock=1067', veg:true, desc:'Smoky paneer, capsicum & onion', rating:4.4, price:359, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p68', name:'Farmhouse Special 68', image:'https://loremflickr.com/900/650/pizza,food?lock=1068', veg:true, desc:'Mushroom, sweetcorn, capsicum & tomato', rating:4.5, price:339, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p69', name:'Pepperoni Blast Special 69', image:'https://loremflickr.com/900/650/pizza,food?lock=1069', veg:false, desc:'Loaded pepperoni & mozzarella', rating:4.6, price:409, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p70', name:'Chicken Tikka Special 70', image:'https://loremflickr.com/900/650/pizza,food?lock=1070', veg:false, desc:'Tandoori chicken, onion & peppers', rating:4.7, price:429, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p71', name:'BBQ Chicken Special 71', image:'https://loremflickr.com/900/650/pizza,food?lock=1071', veg:false, desc:'Smoky BBQ chicken with red onion', rating:4.8, price:419, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p72', name:'Cheese Burst Special 72', image:'https://loremflickr.com/900/650/pizza,food?lock=1072', veg:true, desc:'Molten mozzarella core, extra cheese', rating:4.9, price:379, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p73', name:'Margherita Special 73', image:'https://loremflickr.com/900/650/pizza,food?lock=1073', veg:true, desc:'Fresh tomato, mozzarella & basil', rating:4.2, price:289, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p74', name:'Veggie Supreme Special 74', image:'https://loremflickr.com/900/650/pizza,food?lock=1074', veg:true, desc:'Bell pepper, onion, corn & olives', rating:4.3, price:339, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p75', name:'Paneer Tikka Special 75', image:'https://loremflickr.com/900/650/pizza,food?lock=1075', veg:true, desc:'Smoky paneer, capsicum & onion', rating:4.4, price:369, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p76', name:'Farmhouse Special 76', image:'https://loremflickr.com/900/650/pizza,food?lock=1076', veg:true, desc:'Mushroom, sweetcorn, capsicum & tomato', rating:4.5, price:349, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p77', name:'Pepperoni Blast Special 77', image:'https://loremflickr.com/900/650/pizza,food?lock=1077', veg:false, desc:'Loaded pepperoni & mozzarella', rating:4.6, price:419, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p78', name:'Chicken Tikka Special 78', image:'https://loremflickr.com/900/650/pizza,food?lock=1078', veg:false, desc:'Tandoori chicken, onion & peppers', rating:4.7, price:439, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p79', name:'BBQ Chicken Special 79', image:'https://loremflickr.com/900/650/pizza,food?lock=1079', veg:false, desc:'Smoky BBQ chicken with red onion', rating:4.8, price:429, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p80', name:'Cheese Burst Special 80', image:'https://loremflickr.com/900/650/pizza,food?lock=1080', veg:true, desc:'Molten mozzarella core, extra cheese', rating:4.9, price:389, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p81', name:'Margherita Special 81', image:'https://loremflickr.com/900/650/pizza,food?lock=1081', veg:true, desc:'Fresh tomato, mozzarella & basil', rating:4.2, price:299, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p82', name:'Veggie Supreme Special 82', image:'https://loremflickr.com/900/650/pizza,food?lock=1082', veg:true, desc:'Bell pepper, onion, corn & olives', rating:4.3, price:349, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p83', name:'Paneer Tikka Special 83', image:'https://loremflickr.com/900/650/pizza,food?lock=1083', veg:true, desc:'Smoky paneer, capsicum & onion', rating:4.4, price:379, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p84', name:'Farmhouse Special 84', image:'https://loremflickr.com/900/650/pizza,food?lock=1084', veg:true, desc:'Mushroom, sweetcorn, capsicum & tomato', rating:4.5, price:359, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p85', name:'Pepperoni Blast Special 85', image:'https://loremflickr.com/900/650/pizza,food?lock=1085', veg:false, desc:'Loaded pepperoni & mozzarella', rating:4.6, price:429, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p86', name:'Chicken Tikka Special 86', image:'https://loremflickr.com/900/650/pizza,food?lock=1086', veg:false, desc:'Tandoori chicken, onion & peppers', rating:4.7, price:449, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p87', name:'BBQ Chicken Special 87', image:'https://loremflickr.com/900/650/pizza,food?lock=1087', veg:false, desc:'Smoky BBQ chicken with red onion', rating:4.8, price:439, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p88', name:'Cheese Burst Special 88', image:'https://loremflickr.com/900/650/pizza,food?lock=1088', veg:true, desc:'Molten mozzarella core, extra cheese', rating:4.9, price:399, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p89', name:'Margherita Special 89', image:'https://loremflickr.com/900/650/pizza,food?lock=1089', veg:true, desc:'Fresh tomato, mozzarella & basil', rating:4.2, price:309, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p90', name:'Veggie Supreme Special 90', image:'https://loremflickr.com/900/650/pizza,food?lock=1090', veg:true, desc:'Bell pepper, onion, corn & olives', rating:4.3, price:359, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p91', name:'Paneer Tikka Special 91', image:'https://loremflickr.com/900/650/pizza,food?lock=1091', veg:true, desc:'Smoky paneer, capsicum & onion', rating:4.4, price:389, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p92', name:'Farmhouse Special 92', image:'https://loremflickr.com/900/650/pizza,food?lock=1092', veg:true, desc:'Mushroom, sweetcorn, capsicum & tomato', rating:4.5, price:369, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p93', name:'Pepperoni Blast Special 93', image:'https://loremflickr.com/900/650/pizza,food?lock=1093', veg:false, desc:'Loaded pepperoni & mozzarella', rating:4.6, price:439, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p94', name:'Chicken Tikka Special 94', image:'https://loremflickr.com/900/650/pizza,food?lock=1094', veg:false, desc:'Tandoori chicken, onion & peppers', rating:4.7, price:459, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p95', name:'BBQ Chicken Special 95', image:'https://loremflickr.com/900/650/pizza,food?lock=1095', veg:false, desc:'Smoky BBQ chicken with red onion', rating:4.8, price:449, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p96', name:'Cheese Burst Special 96', image:'https://loremflickr.com/900/650/pizza,food?lock=1096', veg:true, desc:'Molten mozzarella core, extra cheese', rating:4.9, price:409, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p97', name:'Margherita Special 97', image:'https://loremflickr.com/900/650/pizza,food?lock=1097', veg:true, desc:'Fresh tomato, mozzarella & basil', rating:4.2, price:319, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p98', name:'Veggie Supreme Special 98', image:'https://loremflickr.com/900/650/pizza,food?lock=1098', veg:true, desc:'Bell pepper, onion, corn & olives', rating:4.3, price:369, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p99', name:'Paneer Tikka Special 99', image:'https://loremflickr.com/900/650/pizza,food?lock=1099', veg:true, desc:'Smoky paneer, capsicum & onion', rating:4.4, price:399, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
  {id:'p100', name:'Farmhouse Special 100', image:'https://loremflickr.com/900/650/pizza,food?lock=1100', veg:true, desc:'Mushroom, sweetcorn, capsicum & tomato', rating:4.5, price:379, gradient:['#e8503a','#f2b545'], toppingColor:'#7a2e1c'},
];
const SIZES = [{id:'small',label:'Small',price:0},{id:'medium',label:'Medium',price:100},{id:'large',label:'Large',price:200}];
const CRUSTS = [{id:'regular',label:'Regular',price:0},{id:'cheeseburst',label:'Cheese Burst',price:50}];
const EXTRAS = [{id:'cheese',label:'Extra Cheese',price:40},{id:'mushroom',label:'Mushroom',price:30}];
const SIDES = [
  {id:'garlic-bread',name:'Garlic Bread',price:129,desc:'Buttery garlic bread with herbs',image:'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=700&q=85'},
  {id:'stuffed-garlic-bread',name:'Stuffed Garlic Bread',price:179,desc:'Cheesy stuffed garlic bread',image:'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=700&q=85'},
  {id:'potato-fries',name:'Potato Fries',price:99,desc:'Crispy golden potato fries',image:'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=85'},
  {id:'pasta',name:'Pasta',price:169,desc:'Creamy Italian-style pasta',image:'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=700&q=85'}
];
const BEVERAGES = [
  {id:'coke',name:'Coke',price:60,desc:'Chilled bottled Coke',image:'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=700&q=85'},
  {id:'pepsi',name:'Pepsi',price:60,desc:'Chilled bottled Pepsi',image:'https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=700&q=85'},
  {id:'sprite',name:'Sprite',price:60,desc:'Chilled lemon-lime soft drink',image:'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=700&q=85'},
  {id:'fanta',name:'Fanta',price:60,desc:'Chilled orange soft drink',image:'https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=700&q=85'},
  {id:'thums-up',name:'Thums Up',price:60,desc:'Bold Indian cola soft drink',image:'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=700&q=85'},
  {id:'mountain-dew',name:'Mountain Dew',price:65,desc:'Chilled citrus soft drink',image:'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=700&q=85'},
  {id:'maaza',name:'Maaza',price:70,desc:'Mango packaged fruit drink',image:'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=85'},
  {id:'slice',name:'Slice',price:70,desc:'Chilled mango fruit drink',image:'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=85'},
  {id:'appy-fizz',name:'Appy Fizz',price:70,desc:'Sparkling apple drink',image:'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?auto=format&fit=crop&w=700&q=85'},
  {id:'monster',name:'Monster Energy',price:140,desc:'Chilled Monster energy drink',image:'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=700&q=85'},
  {id:'red-bull',name:'Red Bull',price:150,desc:'Chilled Red Bull energy drink',image:'https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=700&q=85'},
  {id:'packaged-juice',name:'Packaged Juice',price:70,desc:'Refreshing packaged fruit juice',image:'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=700&q=85'}
];
const DESSERTS = [
  {id:'choco-lava',name:'Choco Lava Cake',price:129,desc:'Warm chocolate cake with molten centre',image:'https://images.unsplash.com/photo-1606313564200-e75d5e30476f?auto=format&fit=crop&w=700&q=85'},
  {id:'chocolate-brownie',name:'Chocolate Brownie',price:119,desc:'Rich fudgy chocolate brownie',image:'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?auto=format&fit=crop&w=700&q=85'}
];
const MENU_CATEGORIES = {pizzas:PIZZAS,sides:SIDES,beverages:BEVERAGES,desserts:DESSERTS};

let locationStatus = 'not_checked';


const COMBOS = [
  {
    id:'combo1', name:'Duo Deal', price:399,
    desc:'2 Medium Pizzas + 2 Cold Drinks',
    items:'2 Medium Pizzas · 2 Cold Drinks', emoji:'🍕'
  },
  {
    id:'combo2', name:'Family Feast', price:699,
    desc:'2 Large Pizzas + Garlic Bread + 1L Soft Drink',
    items:'2 Large Pizzas · Garlic Bread · 1L Soft Drink', emoji:'👨‍👩‍👧'
  },
  {
    id:'combo3', name:'Party Combo', price:999,
    desc:'4 Medium Pizzas + 2 Garlic Bread + 2L Soft Drink',
    items:'4 Medium Pizzas · 2 Garlic Bread · 2L Soft Drink', emoji:'🔥'
  },
  {
    id:'combo4', name:'Couple Combo', price:499,
    desc:'1 Large Pizza + Garlic Bread + 2 Drinks',
    items:'1 Large Pizza · Garlic Bread · 2 Drinks', emoji:'💑'
  }
];

const COUPONS = {
  PIZZA10:{type:'percent',value:10,min:299,label:'10% OFF on ₹299+'},
  PIZZA20:{type:'percent',value:20,min:399,label:'20% OFF on ₹399+'},
  PIZZA30:{type:'percent',value:30,min:499,label:'30% OFF on ₹499+'}
};

let cart = [];               // {lineId, pizzaId, name, basePrice, size, crust, extras[], qty, unitPrice}
let filter = 'all';
let menuCategory = 'pizzas';
let appliedCoupon = null;
let czState = null;          // in-progress customization
let orderCounter = 1024;
let currentOrder = null;

/* ---------------- Nav / page switching ---------------- */
function showPage(name){
  ['home','checkout','confirm','track'].forEach(p=>{
    document.getElementById('page-'+p).classList.toggle('hidden', p!==name);
  });
  window.scrollTo({top:0,behavior:'smooth'});
}
function scrollToSection(id){
  const el = document.getElementById(id);
  if(!el) return;

  const header = document.querySelector('header');
  const headerHeight = header ? header.offsetHeight : 0;
  const top = el.getBoundingClientRect().top + window.pageYOffset - headerHeight - 10;

  window.scrollTo({
    top: Math.max(0, top),
    behavior: 'smooth'
  });
}
function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(()=>t.classList.remove('show'), 2200);
}


/* ---------------- Login / Sign Up ---------------- */
let authMode = 'login';
function openLoginModal(){
  document.getElementById('loginOverlay').classList.remove('hidden');
  updateAuthUI();
}
function closeLoginModal(){
  document.getElementById('loginOverlay').classList.add('hidden');
}
function toggleAuthMode(){
  authMode = authMode === 'login' ? 'signup' : 'login';
  updateAuthUI();
}
function updateAuthUI(){
  const isLogin = authMode === 'login';
  document.getElementById('authTitle').textContent = isLogin ? 'Welcome Back 👋' : 'Create Account 🍕';
  document.getElementById('authSub').textContent = isLogin ? 'Login to continue ordering your favourite pizza.' : 'Sign up and start ordering delicious pizza.';
  document.getElementById('authBtn').textContent = isLogin ? 'Login' : 'Create Account';
  document.getElementById('authSwitchText').textContent = isLogin ? 'New here?' : 'Already have an account?';
  document.getElementById('authSwitchBtn').textContent = isLogin ? 'Sign Up' : 'Login';
}
function handleAuth(){
  const name = document.getElementById('authName').value.trim();
  const mobile = document.getElementById('authMobile').value.trim();
  const email = document.getElementById('authEmail').value.trim();

  if(authMode === 'signup' && name.length < 2){
    showToast('Please enter your full name');
    return;
  }
  if(!/^[6-9]\d{9}$/.test(mobile)){
    showToast('Enter a valid 10-digit mobile number');
    return;
  }
  if(!/^\S+@\S+\.\S+$/.test(email)){
    showToast('Enter a valid email address');
    return;
  }

  const userName = name || email.split('@')[0];
  localStorage.setItem('pizzaHouseUser', JSON.stringify({name:userName, mobile, email}));
  closeLoginModal();
  showToast(authMode === 'login' ? 'Login successful 🎉' : 'Account created successfully 🎉');
  document.querySelector('.nav-right .btn-dark').textContent = 'Hi, ' + userName.split(' ')[0];
}

/* ---------------- Hero pizza art ---------------- */
function buildHeroPizza(){
  const el = document.getElementById('heroPizza');
  el.innerHTML = `
    <img
      src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1000&q=90"
      alt="Freshly baked cheese pizza"
      style="width:100%;height:100%;object-fit:cover;border-radius:50%;display:block;"
    >
  `;
}
function buildMiniPizza(container, colorA, colorB){
  container.innerHTML='';
  container.style.background = `radial-gradient(circle at 40% 35%, ${colorB}, ${colorA} 75%)`;
  container.style.position='relative';
  const colors=[colorA,'#3a2620','#e3a23c'];
  for(let i=0;i<8;i++){
    const t=document.createElement('div');
    t.className='topping';
    const size=7+Math.random()*5;
    const angle=Math.random()*Math.PI*2;
    const r=8+Math.random()*28;
    t.style.width=size+'px'; t.style.height=size+'px';
    t.style.left=(50+Math.cos(angle)*r)+'%';
    t.style.top=(50+Math.sin(angle)*r)+'%';
    t.style.background=colors[i%colors.length];
    t.style.transform='translate(-50%,-50%)';
    container.appendChild(t);
  }
}

/* ---------------- Menu rendering ---------------- */
function setFilter(f, btn){
  filter = f; menuCategory = 'pizzas';
  document.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('active'));
  btn.classList.add('active'); renderMenu();
}
function setCategory(cat, btn){
  menuCategory = cat; filter = 'all';
  document.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('active'));
  btn.classList.add('active'); renderMenu();
}
function addSimpleItem(item, category){
  const lineId='l'+Date.now()+Math.random().toString(16).slice(2);
  cart.push({lineId,name:item.name,meta:category+' · Regular',unitPrice:item.price,qty:1});
  updateCartBadge(); renderCartLines();
  renderCartOffer(); showToast(item.name+' added to cart 🛒');
}
function renderMenu(){
  const grid=document.getElementById('menuGrid');
  const q=document.getElementById('searchInput').value.trim().toLowerCase(); grid.innerHTML='';
  if(menuCategory!=='pizzas'){
    const list=MENU_CATEGORIES[menuCategory].filter(x=>!q||x.name.toLowerCase().includes(q)||x.desc.toLowerCase().includes(q));
    list.forEach(item=>{
      const card=document.createElement('div'); card.className='pizza-card';
      card.innerHTML=`<div class="card-media"><img class="pizza-photo" src="${item.image}" alt="${item.name}" loading="lazy"></div><div class="card-body"><div class="card-top"><h3>${item.name}</h3><span class="pill pill-veg">MENU</span></div><p class="card-desc">${item.desc}</p><div class="card-bottom"><span class="price">₹${item.price}</span><button class="add-btn" onclick="addSimpleItem(MENU_CATEGORIES['${menuCategory}'].find(x=>x.id==='${item.id}'),'${menuCategory}')">Add to Cart</button></div></div>`;
      grid.appendChild(card);
    }); return;
  }
  const list=PIZZAS.filter(p=>(filter==='veg'?p.veg:filter==='nonveg'?!p.veg:true)&&(!q||(p.name.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q))));
  list.forEach(p=>{const card=document.createElement('div');card.className='pizza-card';card.innerHTML=`<div class="card-media"><img class="pizza-photo" src="${p.image}" alt="${p.name}" loading="lazy"></div><div class="card-body"><div class="card-top"><h3>${p.name}</h3><span class="pill ${p.veg?'pill-veg':'pill-nonveg'}">${p.veg?'🟢 VEG':'🔴 NON-VEG'}</span></div><div class="rating">⭐ ${p.rating}</div><p class="card-desc">${p.desc}</p><div class="card-bottom"><span class="price">₹${p.price}</span><button class="add-btn" onclick="openCustomize('${p.id}')">Add to Cart</button></div></div>`;grid.appendChild(card);});
}

/* ---------------- Customize modal ---------------- */
function openCustomize(pizzaId){
  const pizza = PIZZAS.find(p=>p.id===pizzaId);
  czState = {pizza, size:'small', crust:'regular', extras:[], qty:1};
  document.getElementById('cz-name').textContent = '🍕 '+pizza.name;
  document.getElementById('cz-desc').textContent = pizza.desc;
  renderCzOptions();
  document.getElementById('customizeOverlay').classList.remove('hidden');
}
function closeCustomize(){ document.getElementById('customizeOverlay').classList.add('hidden'); }
function renderCzOptions(){
  const sizesEl = document.getElementById('cz-sizes');
  sizesEl.innerHTML='';
  SIZES.forEach(s=>{
    const row=document.createElement('label');
    row.className='opt-row'+(czState.size===s.id?' selected':'');
    row.innerHTML=`<span class="opt-left"><input type="radio" name="cz-size" ${czState.size===s.id?'checked':''}> ${s.label}</span><span class="opt-price">${s.price? '+₹'+s.price : 'Base ₹'+czState.pizza.price}</span>`;
    row.onclick=()=>{czState.size=s.id; renderCzOptions();};
    sizesEl.appendChild(row);
  });
  const crustsEl = document.getElementById('cz-crusts');
  crustsEl.innerHTML='';
  CRUSTS.forEach(c=>{
    const row=document.createElement('label');
    row.className='opt-row'+(czState.crust===c.id?' selected':'');
    row.innerHTML=`<span class="opt-left"><input type="radio" name="cz-crust" ${czState.crust===c.id?'checked':''}> ${c.label}</span><span class="opt-price">${c.price? '+₹'+c.price : 'Included'}</span>`;
    row.onclick=()=>{czState.crust=c.id; renderCzOptions();};
    crustsEl.appendChild(row);
  });
  const extrasEl = document.getElementById('cz-extras');
  extrasEl.innerHTML='';
  EXTRAS.forEach(e=>{
    const checked = czState.extras.includes(e.id);
    const row=document.createElement('label');
    row.className='opt-row'+(checked?' selected':'');
    row.innerHTML=`<span class="opt-left"><input type="checkbox" ${checked?'checked':''}> ${e.label}</span><span class="opt-price">+₹${e.price}</span>`;
    row.onclick=(ev)=>{
      ev.preventDefault();
      if(checked){ czState.extras = czState.extras.filter(x=>x!==e.id); }
      else{ czState.extras.push(e.id); }
      renderCzOptions();
    };
    extrasEl.appendChild(row);
  });
  document.getElementById('cz-qty').textContent = czState.qty;
  document.getElementById('cz-total').textContent = '₹'+czUnitPrice()*czState.qty;
}
function czUnitPrice(){
  let total = czState.pizza.price;
  total += SIZES.find(s=>s.id===czState.size).price;
  total += CRUSTS.find(c=>c.id===czState.crust).price;
  czState.extras.forEach(exId=> total += EXTRAS.find(e=>e.id===exId).price);
  return total;
}
function changeCzQty(delta){
  czState.qty = Math.max(1, czState.qty+delta);
  renderCzOptions();
}
function confirmAddToCart(){
  const unit = czUnitPrice();
  const sizeLabel = SIZES.find(s=>s.id===czState.size).label;
  const crustLabel = CRUSTS.find(c=>c.id===czState.crust).label;
  const extraLabels = czState.extras.map(id=>EXTRAS.find(e=>e.id===id).label);
  cart.push({
    lineId: 'l'+Date.now()+Math.random().toString(16).slice(2),
    name: czState.pizza.name,
    meta: `${sizeLabel} · ${crustLabel}${extraLabels.length? ' · '+extraLabels.join(', '):''}`,
    unitPrice: unit,
    qty: czState.qty
  });
  updateCartBadge();
  closeCustomize();
  showToast(`${czState.pizza.name} × ${czState.qty} added to cart 🍕`);
  renderCartLines();
  renderCartOffer();
}

/* ---------------- Cart ---------------- */
function updateCartBadge(){
  const count = cart.reduce((s,l)=>s+l.qty,0);
  document.getElementById('cartCount').textContent = count;
}
function cartSubtotal(){ return cart.reduce((s,l)=>s+l.unitPrice*l.qty,0); }
function discountAmount(sub){
  if(!appliedCoupon) return 0;
  const offer = typeof appliedCoupon === 'string' ? COUPONS[appliedCoupon] : appliedCoupon;
  if(!offer) return 0;
  if(offer.min && sub < offer.min) return 0;
  if(offer.type === 'percent') return sub * offer.value / 100;
  return offer.value;
}
function deliveryFee(sub){
  // Cart must not show a delivery charge until Home Delivery is selected.
  if(sub===0 || selectedDelivery!=='home') return 0;
  // Home delivery: FREE on orders ₹599+, otherwise ₹99.
  return sub >= 599 ? 0 : 99;
}
function platformFee(sub){
  return sub > 0 ? 5 : 0;
}
function taxAmount(taxable){
  // Keep GST in decimals; do not round to a whole rupee.
  return taxable * 0.08;
}
function cgstAmount(taxable){
  return taxable * 0.04;
}
function sgstAmount(taxable){
  return taxable * 0.04;
}
function money(value){
  // Display money with exactly 2 decimal places, without whole-rupee rounding.
  return Number(value).toFixed(2);
}
function deliveryText(){
  if(!selectedDelivery) return '₹0';
  if(selectedDelivery==='pickup') return '₹0';
  if(cartSubtotal() >= 599) return '₹0 (Free — ₹599+ order)';
  return '₹99';
}


function applyCartOffer(code){
  const offer = COUPONS[code];
  if(!offer) return;
  const sub = cartSubtotal();
  if(sub < offer.min){
    showToast(`${code} is available on orders ₹${offer.min}+`);
    return;
  }
  appliedCoupon = code;
  showToast(`${code} applied — ${offer.value}% OFF 🎉`);
  renderCartLines();
  renderCartOffer();
}
function removeCartOffer(){
  if(!appliedCoupon) return;
  const oldCode = appliedCoupon;
  appliedCoupon = null;
  showToast(`${oldCode} removed`);
  renderCartLines();
  renderCartOffer();
}
function renderCartOffer(){
  const list = document.getElementById('cartOfferList');
  if(!list) return;
  const sub = cartSubtotal();
  if(appliedCoupon){
    const selected = COUPONS[appliedCoupon];
    if(!selected || sub < selected.min) appliedCoupon = null;
  }
  const offers = Object.entries(COUPONS);
  list.innerHTML = offers.map(([code,offer])=>{
    const eligible = sub >= offer.min;
    const applied = appliedCoupon === code;
    return `<div style="display:flex;justify-content:space-between;gap:10px;align-items:center;padding:10px 0;border-top:1px solid #eadccf;">
      <div>
        <div style="font-weight:700;">${code} — ${offer.value}% OFF</div>
        <div style="font-size:12px;color:#6b5b52;">On orders ₹${offer.min}+</div>
      </div>
      <button type="button" class="add-btn" onclick="${applied ? 'removeCartOffer()' : `applyCartOffer('${code}')`}" ${(!eligible && !applied)?'disabled':''}>
        ${applied ? 'Remove' : (eligible ? 'Apply' : 'Not Eligible')}
      </button>
    </div>`;
  }).join('');
}
function proceedToCheckout(){
  if(!cart.length){
    showToast('Your cart is empty');
    return;
  }
  const loggedUser = JSON.parse(localStorage.getItem('pizzaHouseLoggedUser') || 'null');
  if(!loggedUser){
    showToast('Please login to continue ordering');
    if(typeof openLoginModal === 'function') openLoginModal();
    else if(typeof openAuth === 'function') openAuth();
    return;
  }
  closeCart();
  showPage('checkout');
  if(typeof renderCheckoutSummary === 'function') renderCheckoutSummary();
  if(typeof prefillCheckoutUser === 'function') prefillCheckoutUser(loggedUser);
}


function renderCombos(){
  const grid = document.getElementById('comboGrid');
  if(!grid) return;
  grid.innerHTML = COMBOS.map(c=>`
    <div class="pizza-card">
      <div class="card-media"><div style="font-size:72px">${c.emoji}</div></div>
      <div class="card-body">
        <div class="card-top"><h3>${c.name}</h3><span class="rating">Combo</span></div>
        <div class="card-desc">${c.desc}</div>
        <div style="font-size:12px;color:#7a685f;">${c.items}</div>
        <div class="card-bottom">
          <span class="price">₹${c.price}</span>
          <button class="add-btn" onclick="addCombo('${c.id}')">Add Combo</button>
        </div>
      </div>
    </div>`).join('');
}
function addCombo(id){
  const combo = COMBOS.find(c=>c.id===id);
  if(!combo) return;
  const lineId = id+'-'+Date.now();
  cart.push({
    lineId, name:combo.name, meta:combo.items, unitPrice:combo.price, qty:1,
    isCombo:true
  });
  renderCartLines();
  showToast(`${combo.name} added to cart 🎉`);
}
function setComboCategory(category){
  const pizzaGrid = document.querySelector('.menu-grid:not(#comboGrid)');
  const comboGrid = document.getElementById('comboGrid');
  if(category==='combos'){
    if(pizzaGrid) pizzaGrid.classList.add('hidden');
    if(comboGrid) comboGrid.classList.remove('hidden');
    renderCombos();
  }else{
    if(pizzaGrid) pizzaGrid.classList.remove('hidden');
    if(comboGrid) comboGrid.classList.add('hidden');
  }
}
function renderCartLines(){
  updateCartBadge();
  const linesWrap = document.getElementById('cartLines');
  linesWrap.innerHTML='';
  if(cart.length===0){
    linesWrap.innerHTML = '<div class="empty-cart">Your cart is empty 🍕<br>Add a pizza to get started.</div>';
  } else {
    cart.forEach(line=>{
      const row = document.createElement('div');
      row.className='cart-line';
      row.innerHTML = `
        <div>
          <div class="cl-name">${line.name} <span style="display:inline-block;margin-left:6px;padding:3px 8px;border-radius:999px;background:rgba(214,64,30,.12);color:var(--tomato-deep);font-size:11px;">Qty: ${line.qty}</span></div>
          <div class="cl-meta">${line.meta}</div>
          <button class="cl-remove" onclick="removeLine('${line.lineId}')">Remove ✕</button>
        </div>
        <div class="cl-right">
          <strong style="font-size:12px;">₹${line.unitPrice} × ${line.qty} = ₹${line.unitPrice*line.qty}</strong>
          <span class="cl-qty" style="margin-top:4px;">
            <button type="button" onclick="changeLineQty('${line.lineId}',-1)">−</button>
            <span style="font-weight:800;">${line.qty}</span>
            <button type="button" onclick="changeLineQty('${line.lineId}',1)">+</button>
          </span>
        </div>`;
      linesWrap.appendChild(row);
    });
  }
  if(cartSubtotal()>=499 && !cart.some(l=>l.name==='Garlic Bread — FREE')) addFreeLine('Garlic Bread — FREE',0,'Free Garlic Bread Offer');
  const sub = cartSubtotal();
  const disc = discountAmount(sub);
  const del = deliveryFee(sub);
  const taxable = Math.max(0, sub - disc + del + platformFee(sub));
  const cgst = cgstAmount(taxable);
  const sgst = sgstAmount(taxable);
  const total = taxable + cgst + sgst;
  document.getElementById('dr-subtotal').textContent = '₹'+sub.toFixed(2);
  document.getElementById('dr-discount').textContent = '-₹'+disc.toFixed(2);
  document.getElementById('dr-delivery').textContent = deliveryText();
  document.getElementById('dr-platform').textContent = '₹'+money(platformFee(sub));
  document.getElementById('dr-cgst').textContent = '₹'+money(cgst);
  document.getElementById('dr-sgst').textContent = '₹'+money(sgst);
  document.getElementById('dr-total').textContent = '₹'+money(total);
  document.getElementById('proceedCheckoutBtn').disabled = cart.length===0;
  updateCartBadge();
}
function changeLineQty(lineId, delta){
  const line = cart.find(l=>l.lineId===lineId);
  if(!line) return;
  line.qty += delta;
  if(line.qty<=0) cart = cart.filter(l=>l.lineId!==lineId);
  renderCartLines();
  renderCartOffer();
}
function removeLine(lineId){
  cart = cart.filter(l=>l.lineId!==lineId);
  renderCartLines();
  renderCartOffer();
  showToast('Item removed from cart');
}
function openCart(){
  renderCartLines();
  renderCartOffer();
  document.getElementById('drawerOverlay').classList.remove('hidden');
  document.getElementById('cartDrawer').classList.remove('hidden');
}
function closeCart(){
  document.getElementById('drawerOverlay').classList.add('hidden');
  document.getElementById('cartDrawer').classList.add('hidden');
}

function addFreeLine(name,price,meta){
  if(cart.some(l=>l.name===name && l.isOffer)){showToast(name+' offer already added');return;}
  cart.push({lineId:'offer'+Date.now()+Math.random().toString(16).slice(2),name,meta,unitPrice:price,qty:1,isOffer:true});
  updateCartBadge(); renderCartLines();
  renderCartOffer();
}
function applyBuy1Get1(){
  const pizza=cart.find(l=>PIZZAS.some(p=>p.name===l.name));
  if(!pizza){showToast('Add a pizza first for Buy 1 Get 1');return;}
  const p=PIZZAS.find(x=>x.name===pizza.name);
  addFreeLine(p.name+' — BOGO FREE',0,'Buy 1 Get 1 Free · Free second pizza');
  showToast('BOGO applied 🎉');
}
function applyGarlicOffer(){
  if(cartSubtotal()<499){showToast('Add items worth ₹499 to unlock Free Garlic Bread');return;}
  addFreeLine('Garlic Bread — FREE',0,'Free Garlic Bread Offer'); showToast('Free Garlic Bread added 🎁');
}
function addComboOffer(){
  const p=PIZZAS[0], side=SIDES[0], drink=BEVERAGES[0], dessert=DESSERTS[0];
  const comboPrice=499;
  cart.push({lineId:'combo'+Date.now(),name:'Pizza House Combo',meta:`${p.name} + ${side.name} + ${drink.name} + ${dessert.name}`,unitPrice:comboPrice,qty:1,isOffer:true});
  updateCartBadge(); renderCartLines();
  renderCartOffer(); showToast('Combo Offer added 🎉');
}
/* ---------------- Coupons ---------------- */
function applyCoupon(){
  const code = document.getElementById('couponInput').value.trim().toUpperCase();
  const msg = document.getElementById('couponMsg');
  if(!code){ msg.textContent='Enter a coupon code first.'; msg.className='coupon-msg err'; return; }
  const c = COUPONS[code];
  if(c){
    appliedCoupon = c;
    msg.textContent = `✓ ${code} applied — ${c.label} on your order.`;
    msg.className='coupon-msg ok';
    showToast('Coupon applied 🎉');
  } else {
    appliedCoupon = null;
    msg.textContent = '✕ Invalid coupon code.';
    msg.className='coupon-msg err';
  }
  renderCartLines();
  renderCartOffer();
}

/* ---------------- Checkout ---------------- */
let selectedDelivery = null;
let selectedPay=null;
function selectDelivery(val, el){
  selectedDelivery = val;
  document.querySelectorAll('.choice-card').forEach(c=>c.classList.remove('selected'));
  el.classList.add('selected');
  renderCheckoutSummary();
}
function selectPay(val, el){
  selectedPay = val;
  document.querySelectorAll('.pay-opt').forEach(c=>c.classList.remove('selected'));
  el.classList.add('selected');
}
async function goToCheckout(){
  if(cart.length===0){ showToast('Your cart is empty'); return; }

  // Login is required before checkout/order.
  const loggedUser = JSON.parse(localStorage.getItem('pizzaHouseLoggedUser') || 'null');
  if(!loggedUser){
    closeCart();
    openAuth();
    showToast('Please login or sign up before placing an order');
    return;
  }
  // Reset every checkout choice so customer must actively select them.
  selectedDelivery = null;
  selectedPay = null;
  document.querySelectorAll('.choice-card,.pay-opt').forEach(c=>c.classList.remove('selected'));
  document.querySelectorAll('.pay-opt input').forEach(r=>r.checked=false);
  closeCart();
  showPage('checkout');

  // Prefill checkout details from the logged-in account.
  const u = JSON.parse(localStorage.getItem('pizzaHouseLoggedUser') || 'null');
  if(u){
    document.getElementById('in-name').value = u.name || '';
    document.getElementById('in-mobile').value = u.mobile || '';
    document.getElementById('in-email').value = u.email || '';
  }

  renderCheckoutSummary();
}
function renderCheckoutSummary(){
  const linesWrap = document.getElementById('checkoutLines');
  linesWrap.innerHTML='';
  cart.forEach(line=>{
    const row=document.createElement('div');
    row.className='cart-line';
    row.innerHTML = `<div><div class="cl-name">${line.name}</div><div class="cl-meta">${line.meta}</div></div><div class="cl-right"><span>₹${line.unitPrice} × ${line.qty} = ₹${line.unitPrice*line.qty}</span></div>`;
    linesWrap.appendChild(row);
  });
  const sub = cartSubtotal();
  const disc = discountAmount(sub);
  const del = selectedDelivery === 'home' ? deliveryFee(sub) : 0;
  const pf = platformFee(sub);
  const taxable = Math.max(0, sub - disc + del + pf);
  const cgst = cgstAmount(taxable);
  const sgst = sgstAmount(taxable);
  const total = taxable + cgst + sgst;
  document.getElementById('co-subtotal').textContent='₹'+sub.toFixed(2);
  document.getElementById('co-discount').textContent='-₹'+disc.toFixed(2);
  document.getElementById('co-delivery').textContent=selectedDelivery ? deliveryText() : 'Select option';
  document.getElementById('co-platform').textContent='₹'+money(pf);
  document.getElementById('co-cgst').textContent='₹'+money(cgst);
  document.getElementById('co-sgst').textContent='₹'+money(sgst);
  document.getElementById('co-total').textContent='₹'+money(total);
}

function validateField(id, isValid){
  const field = document.getElementById(id);
  field.classList.toggle('error', !isValid);
  return isValid;
}
async function placeOrder() {

  const loggedUser = getLoggedUser();

  const token = localStorage.getItem("token");

  if (!loggedUser || !token) {

    openAuth();

    showToast(
      "Please login before placing an order"
    );

    return;
  }

  if (!selectedDelivery) {
    showToast("Please select a delivery option");
    return;
  }

  if (!selectedPay) {
    showToast("Please select a payment option");
    return;
  }

  if (!cart.length) {
    showToast("Your cart is empty");
    return;
  }

  const name =
    document.getElementById("in-name").value.trim();

  const mobile =
    document.getElementById("in-mobile").value.trim();

  const email =
    document.getElementById("in-email").value.trim();

  const address =
    document.getElementById("in-address").value.trim();

  let ok = true;

  ok =
    validateField(
      "f-name",
      name.length >= 2
    ) && ok;

  ok =
    validateField(
      "f-mobile",
      /^[6-9]\d{9}$/.test(mobile)
    ) && ok;

  ok =
    validateField(
      "f-email",
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) && ok;

  ok =
    validateField(
      "f-address",
      address.length >= 8
    ) && ok;

  if (!ok) {

    showToast(
      "Please fix the highlighted fields"
    );

    return;
  }

  // Price Calculation

  const sub = cartSubtotal();

  const disc = discountAmount(sub);

  const del =
    selectedDelivery === "home"
      ? deliveryFee(sub)
      : 0;

  const pf = platformFee(sub);

  const taxable =
    Math.max(
      0,
      sub - disc + del + pf
    );

  const cgst = cgstAmount(taxable);

  const sgst = sgstAmount(taxable);

  const total =
    taxable + cgst + sgst;

  // Cart Items

  const items = cart.map(item => ({
    name: item.name,

    meta: item.meta || "",

    qty: item.qty || 1,

    unitPrice: Number(item.unitPrice)
  }));

  try {

    const response =
      await fetch(`${API_URL}/orders`, {

        method: "POST",

        headers: {
          "Content-Type":
            "application/json",

          "Authorization":
            `Bearer ${token}`
        },

        body: JSON.stringify({

          items,

          totalAmount: total,

          trainName:
            localStorage.getItem(
              "pizzaHouseTrainOrder"
            ) || "",

          pickupStation:
            localStorage.getItem(
              "pizzaHousePickupStation"
            ) || ""

        })

      });

    const data =
      await response.json();

    if (!response.ok) {

      showToast(
        data.message ||
        "Order could not be placed"
      );

      return;
    }

    // Save Order

    currentOrder = {

      id: data.orderId,

      total,

      name,

      mobile,

      email,

      address,

      delivery:
        selectedDelivery,

      pay:
        selectedPay,

      placedAt:
        Date.now()
    };

    localStorage.setItem(
      "pizzaHouseLastOrderId",
      data.orderId
    );

    localStorage.setItem(
      "pizzaHouseLastOrderStatus",
      data.status || "Order Confirmed"
    );

    document.getElementById(
      "confirmOrderId"
    ).textContent =
      "ORDER #" + data.orderId;

    document.getElementById(
      "confirmTotal"
    ).textContent =
      "₹" + money(total);

    document.getElementById(
      "trackOrderId"
    ).textContent =
      "#" + data.orderId;

    // Clear Cart

    cart = [];

    appliedCoupon = null;

    updateCartBadge();

    renderCartLines();

    if (
      typeof renderCartOffer ===
      "function"
    ) {
      renderCartOffer();
    }

    if (
      typeof showHomeTrackingAfterOrder ===
      "function"
    ) {
      showHomeTrackingAfterOrder();
    }

    renderTracker(true);

    showPage("confirm");

    showToast(
      "Order placed successfully! 🎉"
    );

  } catch (error) {

    console.error(error);

    showToast(
      "Cannot connect to backend. Make sure server.js is running."
    );
  }
}

/* ---------------- Order tracking ---------------- */
const TRACK_STEPS = [
  {icon:'✅', title:'Order Confirmed', desc:'We have received your order and payment.'},
  {icon:'👨‍🍳', title:'Preparing Pizza', desc:'Our chefs are stretching the dough.'},
  {icon:'🔥', title:'Pizza is Baking', desc:'In the wood-fired oven now.'},
  {icon:'🚚', title:'Out for Delivery', desc:'Your rider is on the way.'},
  {icon:'🏠', title:'Delivered', desc:'Enjoy your pizza!'},
];
let trackTimer=null;
let trackStepIndex=0;
function renderTracker(autoPlay){
  const wrap = document.getElementById('trackerSteps');
  trackStepIndex = 0;
  clearInterval(trackTimer);
  draw();
  function draw(){
    wrap.innerHTML='';
    TRACK_STEPS.forEach((s,i)=>{
      const stepEl=document.createElement('div');
      stepEl.className='step'+(i<trackStepIndex?' done':'')+(i===trackStepIndex?' current':'');
      stepEl.innerHTML = `
        ${i<TRACK_STEPS.length-1?'<div class="step-line"></div>':''}
        <div class="step-dot">${i<trackStepIndex? '✓' : s.icon}</div>
        <div class="step-body"><h4>${s.title}</h4><p>${s.desc}</p></div>`;
      wrap.appendChild(stepEl);
    });
  }
  if(autoPlay){
    trackTimer = setInterval(()=>{
      trackStepIndex++;
      if(trackStepIndex>=TRACK_STEPS.length){ trackStepIndex=TRACK_STEPS.length-1; clearInterval(trackTimer); }
      draw();
    }, 2600);
  }
}
function startNewOrder(){
  clearInterval(trackTimer);
  showPage('home');
  scrollToSection('menu');
}

/* ---------------- Init ---------------- */
const savedUser = localStorage.getItem('pizzaHouseUser');
if(savedUser){
  try{
    const user = JSON.parse(savedUser);
    if(user && user.name) document.querySelector('.nav-right .btn-dark').textContent = 'Hi, ' + user.name.split(' ')[0];
  }catch(e){}
}
buildHeroPizza();
renderMenu();
renderCartLines();
  renderCartOffer();


/* ---------------- Login / Sign Up ---------------- */
function getUsers(){
  return JSON.parse(localStorage.getItem('pizzaHouseUsers') || '[]');
}
function saveUsers(users){
  localStorage.setItem('pizzaHouseUsers', JSON.stringify(users));
}
function openAuth(){
  document.getElementById('authOverlay').classList.remove('hidden');
  showLogin();
}
function closeAuth(){
  document.getElementById('authOverlay').classList.add('hidden');
}
function hideAuthViews(){
  ['authLoginView','authSignupView','authForgotView'].forEach(id=>{
    document.getElementById(id).classList.add('hidden');
  });
}
function showLogin(){
  hideAuthViews();
  document.getElementById('authLoginView').classList.remove('hidden');
  setAuthMsg('loginMsg','');
}
function showSignup(){
  hideAuthViews();
  document.getElementById('authSignupView').classList.remove('hidden');
  setAuthMsg('signupMsg','');
  checkPasswordStrength();
}
function showForgotPassword(){
  hideAuthViews();
  document.getElementById('authForgotView').classList.remove('hidden');
  setAuthMsg('forgotMsg','');
  checkNewPasswordStrength();
}
function setAuthMsg(id,msg,ok=false){
  const el=document.getElementById(id);
  el.textContent=msg;
  el.className='auth-error'+(ok?' ok':'');
}
function togglePassword(id,btn){
  const input=document.getElementById(id);
  const visible=input.type==='text';
  input.type=visible?'password':'text';
  btn.textContent=visible?'Show':'Hide';
}
function passwordChecks(password){
  return {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };
}
function isStrongPassword(password){
  const c=passwordChecks(password);
  return c.length && c.upper && c.lower && c.number && c.special;
}
function updateRules(prefix,password){
  const c=passwordChecks(password);
  const map = {
    Length:c.length, Upper:c.upper, Lower:c.lower,
    Number:c.number, Special:c.special
  };
  Object.entries(map).forEach(([key,val])=>{
    const el=document.getElementById(prefix+key);
    if(!el) return;
    const text=el.textContent.replace(/^[✓○]\s*/,'');
    el.textContent=(val?'✓ ':'○ ')+text;
    el.classList.toggle('valid',val);
    el.classList.toggle('invalid',!val);
  });
}
function checkPasswordStrength(){
  updateRules('rule', document.getElementById('signupPassword').value);
}
function checkNewPasswordStrength(){
  updateRules('newRule', document.getElementById('newPassword').value);
}
async function signupUser() {
  const name = document.getElementById("signupName").value.trim();
  const mobile = document.getElementById("signupMobile").value.trim();
  const email = document.getElementById("signupEmail").value.trim().toLowerCase();
  const password = document.getElementById("signupPassword").value;
  const confirm = document.getElementById("confirmPassword").value;

  if (name.length < 2) {
    return setAuthMsg("signupMsg", "Please enter your full name.");
  }

  if (!/^[6-9]\d{9}$/.test(mobile)) {
    return setAuthMsg("signupMsg", "Please enter a valid 10-digit mobile number.");
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return setAuthMsg("signupMsg", "Please enter a valid email address.");
  }

  if (!isStrongPassword(password)) {
    return setAuthMsg(
      "signupMsg",
      "Password must contain uppercase, lowercase, number and special character."
    );
  }

  if (password !== confirm) {
    return setAuthMsg(
      "signupMsg",
      "Password and Confirm Password do not match."
    );
  }

  try {
    const response = await fetch(`${API_URL}/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        mobile,
        email,
        password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return setAuthMsg(
        "signupMsg",
        data.message || "Signup failed."
      );
    }

    setAuthMsg(
      "signupMsg",
      "✓ Account created successfully! Please login.",
      true
    );

    document.getElementById("signupPassword").value = "";
    document.getElementById("confirmPassword").value = "";

    setTimeout(showLogin, 1000);

  } catch (error) {
    console.error(error);

    setAuthMsg(
      "signupMsg",
      "Cannot connect to backend. Make sure server is running."
    );
  }
}
async function loginUser() {

  const email = document.getElementById("loginEmail").value
    .trim()
    .toLowerCase();

  const password =
    document.getElementById("loginPassword").value;

  if (!email) {
    return setAuthMsg(
      "loginMsg",
      "Please enter your registered email."
    );
  }

  if (!password) {
    return setAuthMsg(
      "loginMsg",
      "Please enter your password."
    );
  }

  try {

    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return setAuthMsg(
        "loginMsg",
        data.message || "Invalid email or password."
      );
    }

    // Save JWT Token
    localStorage.setItem("token", data.token);

    // Save User
    localStorage.setItem(
      "pizzaHouseLoggedUser",
      JSON.stringify(data.user)
    );

    localStorage.setItem(
      "pizzaHouseUser",
      JSON.stringify(data.user)
    );

    updateAuthNav();

    closeAuth();

    showToast(
      "Welcome back, " + data.user.name + " 👋"
    );

  } catch (error) {

    console.error(error);

    setAuthMsg(
      "loginMsg",
      "Cannot connect to backend. Make sure server.js is running."
    );
  }
}
function resetPassword(){
  const emailOrMobile=document.getElementById('forgotEmail').value.trim();
  const password=document.getElementById('newPassword').value;
  const confirm=document.getElementById('confirmNewPassword').value;
  const users=getUsers();

  if(!emailOrMobile) return setAuthMsg('forgotMsg','Please enter your registered Gmail.');
  if(!isStrongPassword(password)) return setAuthMsg('forgotMsg','New password does not meet all requirements.');
  if(password!==confirm) return setAuthMsg('forgotMsg','New Password and Confirm Password do not match.');

  const index=users.findIndex(u=>u.mobile===emailOrMobile || u.email===emailOrMobile);
  if(index===-1) return setAuthMsg('forgotMsg','No account found with these details.');

  users[index].password=password;
  saveUsers(users);
  setAuthMsg('forgotMsg','✓ Password reset successfully! Please login.',true);
  document.getElementById('newPassword').value='';
  document.getElementById('confirmNewPassword').value='';
  setTimeout(showLogin,1000);
}
function getLoggedUser(){
  try{
    return JSON.parse(localStorage.getItem('pizzaHouseLoggedUser') || 'null');
  }catch(error){
    localStorage.removeItem('pizzaHouseLoggedUser');
    return null;
  }
}

function updateAuthNav(){
  const btn=document.getElementById('authNavBtn');
  const wrap=document.getElementById('accountWrap');
  const menu=document.getElementById('accountMenu');
  const userName=document.getElementById('accountUserName');
  if(!btn || !wrap || !menu || !userName) return;

  const user=getLoggedUser();

  // Remove any old click handler and always use the correct handler.
  btn.onclick=null;

  if(user && (user.email || user.mobile)){
    btn.textContent='My Account';
    btn.classList.remove('btn-dark');
    btn.classList.add('btn-tomato');
    userName.textContent=user.name || user.email || user.mobile || '';
    btn.onclick=function(e){
      e.stopPropagation();
      toggleMyAccount();
    };
  }else{
    btn.textContent='Login / Sign Up';
    btn.classList.remove('btn-tomato');
    btn.classList.add('btn-dark');
    menu.classList.add('hidden');
    userName.textContent='';
    btn.onclick=function(e){
      e.stopPropagation();
      openAuth();
    };
  }
}

function toggleMyAccount(){
  const user=getLoggedUser();
  const menu=document.getElementById('accountMenu');

  // Login page should open ONLY when there is no logged-in user.
  if(!user || (!user.email && !user.mobile)){
    if(menu) menu.classList.add('hidden');
    openAuth();
    return;
  }

  if(menu) menu.classList.toggle('hidden');
}
function logoutUser(){
  localStorage.removeItem('pizzaHouseLoggedUser');
  document.getElementById('accountMenu').classList.add('hidden');
  updateAuthNav();
  showToast('Logged out successfully');
}


document.addEventListener('click', function(e){
  const wrap=document.getElementById('accountWrap');
  const menu=document.getElementById('accountMenu');
  if(wrap && menu && !wrap.contains(e.target)) menu.classList.add('hidden');
});
window.addEventListener('DOMContentLoaded', updateAuthNav);

// ---------------- Order on Train ----------------
function openTrainOrder(){
  document.getElementById('accountMenu')?.classList.add('hidden');
  const overlay=document.getElementById('trainOrderOverlay');
  const trainInput=document.getElementById('trainSearchInput');
  const stationInput=document.getElementById('stationSearchInput');
  const msg=document.getElementById('trainOrderMsg');

  if(msg) msg.textContent='';
  if(trainInput) trainInput.value=localStorage.getItem('pizzaHouseTrainOrder') || '';
  if(stationInput) stationInput.value=localStorage.getItem('pizzaHousePickupStation') || '';

  overlay?.classList.remove('hidden');
  setTimeout(()=>trainInput?.focus(),100);
}

function closeTrainOrder(){
  document.getElementById('trainOrderOverlay')?.classList.add('hidden');
}

function continueTrainOrder(){
  const trainInput=document.getElementById('trainSearchInput');
  const stationInput=document.getElementById('stationSearchInput');
  const msg=document.getElementById('trainOrderMsg');

  const train=(trainInput?.value || '').trim();
  const station=(stationInput?.value || '').trim();

  if(!train){
    if(msg) msg.textContent='Please enter your train number or train name.';
    trainInput?.focus();
    return;
  }

  if(train.length < 3){
    if(msg) msg.textContent='Please enter a valid train number or train name.';
    trainInput?.focus();
    return;
  }

  if(!station){
    if(msg) msg.textContent='Please enter the pickup station.';
    stationInput?.focus();
    return;
  }

  if(station.length < 3){
    if(msg) msg.textContent='Please enter a valid station name.';
    stationInput?.focus();
    return;
  }

  localStorage.setItem('pizzaHouseTrainOrder', train);
  localStorage.setItem('pizzaHousePickupStation', station);

  closeTrainOrder();
  showToast('🚆 Train: ' + train + ' | 📍 Pickup: ' + station);
  showPage('home');
  setTimeout(()=>scrollToSection('menu'),300);
}



// ---------------- Track Order ----------------
function openTrackOrder(){
  document.getElementById('accountMenu')?.classList.add('hidden');

  const overlay=document.getElementById('trackOrderOverlay');
  const input=document.getElementById('trackOrderInput');
  const msg=document.getElementById('trackOrderMsg');
  const result=document.getElementById('trackOrderResult');

  if(msg) msg.textContent='';
  if(result) result.classList.add('hidden');
  if(input) input.value=localStorage.getItem('pizzaHouseLastOrderId') || '';

  overlay?.classList.remove('hidden');
  setTimeout(()=>input?.focus(),100);
}

function closeTrackOrder(){
  document.getElementById('trackOrderOverlay')?.classList.add('hidden');
}

async function trackOrder() {

  const input =
    document.getElementById(
      "trackOrderInput"
    );

  const msg =
    document.getElementById(
      "trackOrderMsg"
    );

  const result =
    document.getElementById(
      "trackOrderResult"
    );

  const orderId =
    (input?.value || "")
      .trim()
      .toUpperCase();

  const token =
    localStorage.getItem("token");

  if (msg) {
    msg.textContent = "";
  }

  if (result) {
    result.classList.add("hidden");
  }

  if (!orderId) {

    if (msg) {
      msg.textContent =
        "Please enter your Order ID.";
    }

    return;
  }

  if (!token) {

    if (msg) {
      msg.textContent =
        "Please login first.";
    }

    openAuth();

    return;
  }

  try {

    const response =
      await fetch(
        `${API_URL}/orders/${encodeURIComponent(orderId)}`,
        {
          headers: {
            "Authorization":
              `Bearer ${token}`
          }
        }
      );

    const data =
      await response.json();

    if (!response.ok) {

      if (msg) {
        msg.textContent =
          "❌ " +
          (data.message ||
            "Invalid Order ID.");
      }

      return;
    }

    const order =
      data.order;

    const status =
      order.order_status ||
      "Order Confirmed";

    document.getElementById(
      "trackOrderIdText"
    ).textContent =
      "Order ID: " +
      order.order_id;

    document.getElementById(
      "trackOrderStatus"
    ).textContent =
      "🟠 " + status;

    const details =
      document.getElementById(
        "trackOrderDetails"
      );

    if (
      order.train_name ||
      order.pickup_station
    ) {

      details.textContent =
        `Train: ${
          order.train_name ||
          "Not selected"
        } | Pickup Station: ${
          order.pickup_station ||
          "Not selected"
        }`;

    } else {

      details.textContent =
        "Your order is being processed. Please keep checking for updates.";
    }

    localStorage.setItem(
      "pizzaHouseLastOrderId",
      order.order_id
    );

    localStorage.setItem(
      "pizzaHouseLastOrderStatus",
      status
    );

    if (result) {
      result.classList.remove(
        "hidden"
      );
    }

  } catch (error) {

    console.error(error);

    if (msg) {
      msg.textContent =
        "Cannot connect to backend. Make sure server.js is running.";
    }
  }
}

// Save order ID when an order is successfully placed (works with existing checkout flow)
function saveLastOrderForTracking(){
  const orderId='PH'+Date.now().toString().slice(-6);
  localStorage.setItem('pizzaHouseLastOrderId',orderId);
  localStorage.setItem('pizzaHouseLastOrderStatus','Order Confirmed');
  return orderId;
}

async function showMyOrders() {

    const token = localStorage.getItem("token");

    if (!token) {
        showToast("Please login first");
        return;
    }

    // My Orders page open
    document.querySelectorAll(".page").forEach(page => {
        page.classList.add("hidden");
    });

    const myOrdersPage = document.getElementById("myOrdersPage");

    if (myOrdersPage) {
        myOrdersPage.classList.remove("hidden");
    } else {
        showToast("My Orders page not found");
        return;
    }

    const list = document.getElementById("orderHistoryList");

    list.innerHTML = "<p>Loading your orders...</p>";

    try {

        const response = await fetch(`${API_URL}/my-orders`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            list.innerHTML =
                `<p>❌ ${data.message || "Unable to load orders."}</p>`;
            return;
        }

        const orders = data.orders;

        if (!orders || orders.length === 0) {

            list.innerHTML = `
                <div class="empty-orders">
                    <h3>🍕 No Previous Orders</h3>
                    <p>You haven't placed any orders yet.</p>
                </div>
            `;

            return;
        }

        list.innerHTML = "";

        orders.forEach(order => {

            const card = document.createElement("div");

            card.className = "order-history-card";

            const date = new Date(
                order.created_at
            ).toLocaleString();

            card.innerHTML = `
                <h3>🍕 Order #${order.order_id}</h3>

                <p>📅 ${date}</p>

                <p>💰 Total: ₹${order.total_amount}</p>

                <p>
                    📦 Status:
                    <b>${order.order_status || "Order Confirmed"}</b>
                </p>

                <button onclick="trackHistoryOrder('${order.order_id}')">
                    📍 Track This Order
                </button>
            `;

            list.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        list.innerHTML =
            "<p>❌ Cannot connect to server.</p>";
    }
}


function trackHistoryOrder(orderId) {

    if (typeof openTrackOrder === "function") {
        openTrackOrder();
    }

    setTimeout(() => {

        const input =
            document.getElementById("trackOrderInput");

        if (input) {

            input.value = orderId;

            trackOrder();
        }

    }, 300);
}




async function showMyOrders() {

    const token = localStorage.getItem("token");

    if (!token) {
        showToast("Please login first");
        return;
    }

    const myOrdersPage =
        document.getElementById("myOrdersPage");

    if (!myOrdersPage) {
        showToast("My Orders page not found");
        return;
    }

    document.querySelectorAll(".page").forEach(page => {
        page.classList.add("hidden");
    });

    myOrdersPage.classList.remove("hidden");

    const list =
        document.getElementById("orderHistoryList");

    list.innerHTML = "<p>Loading your orders...</p>";

    try {

        const response =
            await fetch(`${API_URL}/my-orders`, {

                headers: {
                    "Authorization":
                        `Bearer ${token}`
                }

            });

        const data =
            await response.json();

        if (!response.ok) {

            list.innerHTML =
                `<p>❌ ${data.message || "Unable to load orders."}</p>`;

            return;
        }

        if (!data.orders || data.orders.length === 0) {

            list.innerHTML = `
                <h3>🍕 No Previous Orders</h3>
                <p>You haven't placed any orders yet.</p>
            `;

            return;
        }

        list.innerHTML = "";

        data.orders.forEach(order => {

            const card =
                document.createElement("div");

            card.className =
                "order-history-card";

            card.innerHTML = `
                <h3>🍕 Order #${order.order_id}</h3>

                <p>
                    📅 ${new Date(order.created_at).toLocaleString()}
                </p>

                <p>
                    💰 Total: ₹${order.total_amount}
                </p>

                <p>
                    📦 Status:
                    <b>${order.order_status || "Order Confirmed"}</b>
                </p>

                <button onclick="trackHistoryOrder('${order.order_id}')">
                    📍 Track This Order
                </button>
            `;

            list.appendChild(card);

        });

    } catch (error) {

        console.error(error);

        list.innerHTML =
            "<p>❌ Cannot connect to server.</p>";
    }
}


function trackHistoryOrder(orderId) {

    openTrackOrder();

    setTimeout(() => {

        const input =
            document.getElementById("trackOrderInput");

        if (input) {

            input.value = orderId;

            trackOrder();

        }

    }, 300);
}