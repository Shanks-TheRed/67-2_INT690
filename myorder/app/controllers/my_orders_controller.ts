import type { HttpContext } from '@adonisjs/core/http'

interface Menu {
    id: number ;
    name: string ;
    price: number ;
    image: string
}

interface OrderItem {
    oid: number ;
    menuId: number;
    name: string,
    quantity: number ;
    price: number ;
    image: string ;
}

const meals : Menu[] = [{
        id: 1,
        name: 'ข้าวกระเพาหมูสับ',
        price: 70,
        image: 'image001'
    },{
        id: 2,
        name: 'ข้าวไก่ผัดขิง',
        price: 80,
        image: 'image002'        
    },{
        id: 3,
        name: 'สุกี้กุ้งแห้ง',
        price: 90,
        image: 'image003'        
    },{
        id: 4,
        name: 'ข้าวผัดหมู',
        price: 70,
        image: 'image004'        
    },{
        id: 5,
        name: 'ข้าวคุกกะปิ',
        price: 85,
        image: 'image005'        
    }
]
const drinks : Menu[] = [{
        id: 6,
        name: 'น้ำแร่',
        price: 20,
        image: 'image006'
    },{
        id: 7,
        name: 'โค้ก รีฟิล',
        price: 49,
        image: 'image007'        
    },{
        id: 8,
        name: 'น้ำแข็ง',
        price: 2,
        image: 'image008'        
    },{
        id: 9,
        name: 'น้ำชาดำเย็น',
        price: 30,
        image: 'image009'        
    },{
        id: 10,
        name: 'น้ำโอเลี้ยง',
        price: 30,
        image: 'image010'        
    },{
        id: 11,
        name: 'น้ำชามะนาว',
        price: 30,
        image: 'image011'        
    }
]

const orderItems: OrderItem[] = [
    // oid: number ;
    // menuId: number;
    // name: string,
    // quantity: number ;
    // price: number ;
    // image: string ;
];
let runNo: number = 1;

export default class MyOrdersController {
    async index({ view }:HttpContext){
        return view.render('pages/home', {meals: meals, drinks: drinks});
    }

    async yourOrder({view}:HttpContext){
        let amount = 0;
        for(let i=0; i<orderItems.length; i++) {
            const cost = orderItems[i]['price'] * orderItems[i]['quantity'];
            amount += cost;
        }
        return view.render('pages/yourOrder', {orderItems: orderItems, amount: amount});
    }

    async takeOrder({params, response}:HttpContext){
        const id = params.id ? params.id : params.menuId ;
        const order = orderItems.find( o => o.menuId == Number(id));
        const isMeal = meals.find( m => m.id == Number(id));
        const isDrink = drinks.find( d => d.id == Number(id));
        if(!order) {
            orderItems.push({
                oid: runNo++, 
                menuId: isMeal ? isMeal.id : isDrink.id, 
                name: isMeal ? isMeal.name : isDrink.name, 
                quantity: 1, 
                price: isMeal ? isMeal.price : isDrink.price, 
                image: isMeal ? isMeal.image : isDrink.image
            })
        } else if(isMeal) {
            const index = orderItems.findIndex( o => o.menuId == Number(id) );
            orderItems[index]['quantity'] += 1;
        } else if(isDrink) {
            const index = orderItems.findIndex( o => o.menuId == Number(id) );
            orderItems[index]['quantity'] += 1;
        };
        response.redirect().toRoute('menus.yourOrder');
    }

    async removeOrder({params, response}: HttpContext){
        const oid = params.oid;
        const index = orderItems.findIndex( o => o.oid == Number(oid) );
        if(orderItems[index]['quantity'] > 1) {
            orderItems[index]['quantity'] -= 1;
            response.redirect().toRoute('menus.yourOrder');
        } else {
            response.redirect().toRoute('menus.removeOrderAll', {oid: oid});
        }
        
    }

    async removeOrderAll({params, response}: HttpContext){
        const oid = params.oid;
        const index = orderItems.findIndex( o => o.oid == Number(oid) );
        orderItems.splice(index, 1);
        response.redirect().toRoute('menus.yourOrder');
    }
}