export class Vista{
	static {
		Vista.VISTA1 = Symbol('Index')
		Vista.VISTA2 = Symbol('Ranking')
		Vista.VISTA3 = Symbol('Conoceos')
		Vista.VISTA4 = Symbol('Empezar')
		Vista.VISTA5 = Symbol('seleccionNivel')
		Vista.VISTA6 = Symbol('Jugar')
		Vista.VISTA7 = Symbol('Formulario')
		Vista.VISTA8 = Symbol('PruebaAJAX')
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
