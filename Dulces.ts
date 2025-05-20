// # Evaluación Técnica: Máquina Vendedora de Dulces en Programación Orientada a Objetos
// ## Requisitos Funcionales
// 1. La máquina debe contener diferentes tipos de dulces, cada uno con sus atributos.
// 2. Los usuarios pueden seleccionar un dulce para comprar.
// 3. La máquina debe verificar si hay suficiente stock y fondos (si aplica) para realizar la compra.
// 4. Después de una venta exitosa, el stock del dulce debe reducirse en uno.
// 5. Un usuario administrador puede ver las ventas totales y de cada producto.
// 6. La máquina puede aceptar pagos (simulando pago con moneda o billete).
// ## Aspectos a Evaluar
// - **Organización y modularidad del código:** Uso correcto de clases y objetos.
// - **Control de errores:** Manejar casos donde no hay stock suficiente o fondos insuficientes.

interface IDulces{
    compra(compraDulces: number):void;
    cantidadDeDulces():boolean
}

interface Maquina{
    seleccionarDulce(nombre: string):void;
    compraDulce(nombre:string, cantidad: number, dinero:number):void;
    ventasTotales():number;
    ventasPorProducto(nombre:string):void;
}

class Dulce implements IDulces{
    public nombre: string;
    public sabor:string;
    public precio:number;
    static venta:number = 0; 
    static stock:number=20;

    constructor(nombre: string, sabor:string, precio:number){
        this.nombre=nombre;
        this.sabor=sabor;
        this.precio=precio;
    }

    compra(compraDulces: number): void {
        Dulce.stock = Dulce.stock - compraDulces;
        Dulce.venta++;
    }

    ventas(){
        return Dulce.venta;
    }

    cantidadDeDulces(): boolean {
        if(Dulce.stock<=1){
            console.log(`Tengo ${Dulce.stock} pieza/s de: ${this.nombre}`)
            return true;
        }else{
            console.log(`${this.nombre} se encuentra agotado ¡RELLENAR!`)
            return false;
        }
    }
}

class MaquinaExpendedora implements Maquina{
    public dulces: Dulce[];
    static ventas:number=0;
    constructor(dulces:Dulce[]){
        this.dulces=dulces;
    }
    seleccionarDulce(nombre: string):void{
        this.dulces.forEach(element => {
            if(element.nombre===nombre){
                element.cantidadDeDulces();
            }else{
                console.log("Dulce no encontrado");
            }
        });
    }
    compraDulce(nombre: string, cantidad: number, dinero:number): void {
        this.dulces.forEach(element => {
            if(element.nombre===nombre && dinero > (cantidad*element.precio)){
                element.compra(cantidad);
                console.log(`su cambio es de: ${dinero - (element.precio*cantidad)}`);
                MaquinaExpendedora.ventas++
            }else{
                console.log("El producto no existe o los fondos son insuficientes.")
            }
        })
    }
    ventasTotales():number{
        return MaquinaExpendedora.ventas;
    }
    ventasPorProducto(nombre: string):void{
        this.dulces.forEach(element => {
            if(element.nombre===nombre){
                console.log(`Ventas todatales de ${element.nombre} igual a ${element.ventas()}`);
            }
        })
    }
    totalVentas(){
        let ventaTotal:number=0;
        this.dulces.forEach(element => {
            ventaTotal += element.ventas()*element.precio;
        })
        return ventaTotal;
    }
}

const chocolate = new Dulce("Chocolate", "Amargo", 15);
const picafresa = new Dulce("Picafresa", "Chamoy y miguelito", 1);
const pelon = new Dulce("Pelon", "Tamarindo", 10);
const lunetas = new Dulce("Lunetas", "Chocolate variado", 20);

const dulces :Dulce[]=[chocolate, picafresa, pelon, lunetas]
const nuevaMaquina = new MaquinaExpendedora(dulces);

nuevaMaquina.compraDulce("Chocolate", 5, 35);
nuevaMaquina.compraDulce("Pelon", 2, 10);
nuevaMaquina.compraDulce("Lunetas", 7, 200);
nuevaMaquina.compraDulce("Picafresas", 10, 10);
nuevaMaquina.compraDulce("Chocolate", 2, 50);

nuevaMaquina.ventasPorProducto("Chocolate");

nuevaMaquina.totalVentas();
console.log(nuevaMaquina.ventasTotales())