
interface Iline_items{
    price: string,
    quantity: number,
}

export function SetCart(line_items: Iline_items) {

    localStorage.setItem(line_items.price,JSON.stringify(line_items))
}


export function GetCart(line_items: Iline_items) { 
   return localStorage.getItem(line_items.price)
}
