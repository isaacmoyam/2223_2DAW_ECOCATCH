export class ModeloUsuario{
	constructor(){
		this.mapa = new Map()
	}
	guardar(clave, valor){
		this.mapa.set(clave, valor)
	}
	ver(clave){
		return this.mapa.get(clave)
	}
}
