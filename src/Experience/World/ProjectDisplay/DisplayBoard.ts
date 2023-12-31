import { Scene } from 'three'
import Experience from '../../Experience'
import { IPosition } from '../../_interfaces'
import Debug from '../../Utils/Debug'
import Resources from '../../Utils/Resources'

export default class DisplayBoard {
	experience: Experience
	scene: Scene
	debug: Debug
	resources: Resources
	resource: any
	name: string
	x: number
	y: number
	z: number
	rotation: number
	debugFolder: any
	model: any
	constructor(
		name: string,
		position: IPosition,
		rotation: number,
		source: string
	) {
		this.experience = new Experience()
		this.scene = this.experience.scene
		this.debug = this.experience.debug
		this.resources = this.experience.resources
		this.resource = this.resources.items[source]

		this.name = name

		const { x, y, z } = position
		this.x = x
		this.y = y
		this.z = z
		this.rotation = rotation

		// Debug
		if (this.debug.active) {
			this.debugFolder = this.debug.ui.addFolder(name)
			this.debugFolder.close()
		}
		this.addTile()
		this.debugInit()
	}

	addTile() {
		this.model = this.resource.scene
		this.model.position.set(this.x, this.y, this.z)
		this.model.rotation.y = this.rotation
		this.model.name = this.name
		console.log(this.model)
		this.scene.add(this.model)
	}

	debugInit() {
		if (this.debug.active) {
			this.debugFolder
				.add(this.model.position, 'x')
				.name('x')
				.min(-20)
				.max(30)
				.step(0.1)

			this.debugFolder
				.add(this.model.position, 'y')
				.name('y')
				.min(-20)
				.max(30)
				.step(0.1)
			this.debugFolder
				.add(this.model.position, 'z')
				.name('z')
				.min(-20)
				.max(30)
				.step(0.1)
			this.debugFolder
				.add(this.model.rotation, 'y')
				.name('rotation')
				.min(-20)
				.max(30)
				.step(0.1)
		}
	}

	update() {}
}
