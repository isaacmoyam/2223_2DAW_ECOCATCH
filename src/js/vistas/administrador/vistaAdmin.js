
export class VistaAdmin{
    static {
        VistaAdmin.VISTA1 = Symbol('Vista1')
        VistaAdmin.VISTA2 = Symbol('Vista2')
    }

    constructor(controlador, base){
        this.controlador = controlador
        this.base = base
    }
    /**
     * Muestra u oculta tu constula
     * @param ver {Boolean} Indica si la vista debe mostrarse (true) u ocultarse (false)
     */
    mostrar(ver){
        if(ver){
            this.base.style.display = 'block'
        }else{
            this.base.style.display = 'none'
        }
    }
}