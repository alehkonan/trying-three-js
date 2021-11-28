import { material } from './materials.js';
import { scene } from './scene.js';
import { BoxGeometry, Group, Mesh, MeshLambertMaterial, SphereGeometry } from './three.module.js';
import { getRadians } from './utils.js';

export class Figure {
  constructor(params) {
    this.params = {
      x: 0,
      y: 0,
      z: 0,
      ry: 0,
      ...params,
    }

    this.group = new Group();
    scene.add(this.group);

    this.group.position.x = this.params.x;
    this.group.position.y = this.params.y;
    this.group.position.z = this.params.z;
    this.group.position.y = this.params.ry;

    this.arms = [];
  }

  createHead() {
    this.head = new Group();

    const geometry = new BoxGeometry(1.4, 1.4, 1.4);
    const headMain = new Mesh(geometry, material);
    this.head.add(headMain);

    this.group.add(this.head);

    this.head.position.y = 1.65;

    this.createEyes();
  }

  createBody() {
    this.body = new Group();

    const geometry = new BoxGeometry(1, 1.5, 1);
    const bodyMain = new Mesh(geometry, material);
    this.body.add(bodyMain);
    this.group.add(this.body);
  }

  createArms() {
    const height = 1;
    const geometry = new BoxGeometry(0.25, 1, 0.25);

    for (let i = 0; i < 2; i++) {
      const armGroup = new Group();
      const arm = new Mesh(geometry, material);

      const m = i % 2 === 0 ? 1 : -1;

      armGroup.add(arm);
      this.group.add(armGroup);

      arm.position.y = height * -0.5;
      armGroup.position.x = m * 0.8;
      armGroup.position.y = 0.6;
      armGroup.rotation.z = getRadians(30 * m);

      this.arms.push(armGroup);
    }
  }

  createEyes() {
    const eyes = new Group();
    const geometry = new SphereGeometry(0.15, 12, 8);

    const eyeMaterial = new MeshLambertMaterial({ color: '#44445c' });

    for (let i = 0; i < 2; i++) {
      const eye = new Mesh(geometry, eyeMaterial);
      const m = i % 2 === 0 ? 1 : -1;

      eyes.add(eye);

      eye.position.x = 0.36 * m;
    }

    this.head.add(eyes);
    eyes.position.z = 0.7;
  }

  createLegs() {
    const legs = new Group();
    const geometry = new BoxGeometry(0.25, 0.4, 0.25);

    for (let i = 0; i < 2; i++) {
      const leg = new Mesh(geometry, material);
      const m = i % 2 === 0 ? 1 : -1;

      legs.add(leg);
      leg.position.x = m * 0.22;
    }

    this.group.add(legs);
    legs.position.y = -1.15;

    this.body.add(legs);
  }

  bounce() {
    this.group.rotation.y = this.params.ry;
    this.group.position.y = this.params.y;
    this.arms.forEach((arm, index) => {
      const m = index % 2 === 0 ? 1 : -1;
      arm.rotation.z = this.params.armRotation * m;
    });
  }

  init() {
    this.createBody();
    this.createHead();
    this.createArms();
    this.createLegs();
  }
}
