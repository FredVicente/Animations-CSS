const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter

// create an engine
var engine = Engine.create();

const myElement = document.querySelector('#teste')
const myElementWidth = document.querySelector('#teste').offsetWidth
const myElementHeight = document.querySelector('#teste').offsetHeight

// create a renderer
var render = Render.create({
    element: myElement,
    engine: engine,
    options: {
        width: myElementWidth,
        height: myElementHeight,
        wireframes: false,
        background:'transparent'
    }
});

// create two boxes and a ground

const ground = Bodies.rectangle(0, myElementHeight, myElementWidth * 2, 60, {
    isStatic: true,
    render:{
        fillStyle: '#F2F2F2',
        strokeStyle: '#F2F2F2',

    }
});

const sideLeft = Bodies.rectangle(0, 0, 10, myElementHeight * 2, {
    isStatic: true,
    render:{
        fillStyle: '#F2F2F2',
        strokeStyle: '#F2F2F2',

    }
})

const sideRigth = Bodies.rectangle(myElementWidth, 0, 10, myElementHeight * 2, {
    isStatic: true,
    render:{
        fillStyle: '#F2F2F2',
        strokeStyle: '#F2F2F2',

    }
})

const boxTop = Bodies.rectangle(0, 0, myElementWidth * 2, 10, {
    isStatic: true,
    render:{
        fillStyle: '#F2F2F2',
        strokeStyle: '#F2F2F2',

    }
})

const ball = Bodies.circle(100, 100, 20, {
    restitution:0.8,
    render:{
        fillStyle: 'orange',
        strokeStyle: 'orange',

    }
})

const post = Bodies.rectangle((myElementWidth - (myElementWidth * 0.25)), (myElementHeight - 30 - (myElementHeight/ 100 * 30)), 20, (myElementHeight * 3 / 5), {
    isStatic:true,
    render:{
        fillStyle: 'grey',
        strokeStyle: 'grey',

    }
})

const rim = Bodies.rectangle((myElementWidth - (myElementWidth * 0.25) - 60), (myElementHeight - (myElementHeight * 3 / 5)), 100, 10, {
    isStatic:true,
    render:{
        fillStyle: 'red',
        strokeStyle: 'red',

    }
})

//Mouse

const mouse = Mouse.create(render.canvas)

const mouseConstraint = MouseConstraint.create(engine, {
    mouse:mouse,
    constraint: {
        render: { visible: false }
    }
})

render.mouse = mouse

// add all of the bodies to the world
Composite.add(engine.world, [ball, ground, post, mouseConstraint, rim, sideRigth, sideLeft, boxTop]);

// run the renderer
Render.run(render);

// create runner
var runner = Runner.create();

// run the engine
Runner.run(runner, engine);

console.log(ball)