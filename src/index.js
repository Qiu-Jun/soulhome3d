import THREE from './lib/three/index'
import avatar from './assest/avatar.jpeg'

const init = () => {
    // 创建场景对象Scene
    const scene = new THREE.Scene();

    // 光源设置
    //环境光
    const ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);

    // 相机设置
    const width = window.innerWidth; //窗口宽度
    const height = window.innerHeight; //窗口高度
    const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.set(0, 0, 3000);

    const group = new THREE.Group();
    const userList = [
        {
            text: '女朋友1',
            avatar: avatar
        },
        {
            text: '女朋友2',
            avatar: avatar
        },
        {
            text: '女朋友3',
            avatar: avatar
        },
        {
            text: '女朋友4',
            avatar: avatar
        },
        {
            text: '女朋友5',
            avatar: avatar
        },
        {
            text: '女朋友6',
            avatar: avatar
        },
        {
            text: '女朋友7',
            avatar: avatar
        },
        {
            text: '女朋友8',
            avatar: avatar
        },
        {
            text: '女朋友9',
            avatar: avatar
        },
        {
            text: '女朋友10',
            avatar: avatar
        },
        {
            text: '女朋友11',
            avatar: avatar
        },
        {
            text: '女朋友12',
            avatar: avatar
        }
    ]
    for ( let i = 0, l = userList.length; i < l; i ++ ) {
        const phi = Math.acos( - 1 + ( 2 * i ) / l );
        const theta = Math.sqrt( l * Math.PI ) * phi;
        const item = userList[Math.floor(i)]
        const img = new Image()
        img.src = item.avatar
        img.crossOrigin = 'annoymous'
        img.onload = function() {
            const sprite = createS(item.text, img)
            sprite.scale.set(120, 60, 1);
            sprite.name = item.text
            sprite.userData = item
            sprite.position.setFromSphericalCoords(800, phi, theta)
            group.add(sprite);
        } 
    }

    scene.add(group);

    // 创建渲染器对象
    const renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(width, height);//设置渲染区域尺寸
    renderer.shadowMap.enabled = false;
    //renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement); //body元素中插入canvas对象
    //执行渲染操作   指定场景、相机作为参数
    renderer.render(scene, camera);
    const controls = new THREE.OrbitControls(camera,renderer.domElement);
    function render() {
        renderer.render(scene,camera);//执行渲染操作
        group.rotateY(-0.002);//每次绕y轴旋转0.01弧度
        group.rotateX(0.002)
        controls.update()
        requestAnimationFrame(render);//请求再次执行渲染函数render
    }
    render();


    let selectObject = null
    const getIntersects = (x, y) => {
        const raycaster = new THREE.Raycaster();
        const mouseVector = new THREE.Vector2();
        //将鼠标位置转换成设备坐标。x和y方向的取值范围是(-1 to 1)
        x = (x / width) * 2 - 1;
        y = -(y / height) * 2 + 1;
        mouseVector.set(x, y);
        //通过摄像机和鼠标位置更新射线
        raycaster.setFromCamera(mouseVector, camera);
        // 返回物体和射线的焦点
        return raycaster.intersectObject(group, true)
    }
    const onDocumentMouseMove = (event) => {
        event.preventDefault();
        if (selectObject) {
            console.log(selectObject);
            selectObject.material.color.set("#ffffff");
            selectObject = null;
        }

        const intersects = getIntersects(event.layerX, event.layerY);
        if (intersects.length > 0) {
            const res = intersects.filter(function(res) {
                return res && res.object
            })[0];
            if (res && res.object) {
                console.log(res)
                selectObject = res.object;
                selectObject.material.color.set("#ffc466")
            }
        }
    }

    window.addEventListener("click", onDocumentMouseMove, false)
}




function createS (text, img, width= 160, height = 80) {
    const canvas = document.createElement("canvas");
    canvas.style.background = 'red'
    canvas.width = width;
    canvas.height = height;
    const originX = width / 2;
    const c = canvas.getContext("2d");
    const avatarR = height / 3
    c.save();
    c.beginPath();
    c.arc(originX, avatarR, avatarR, 0, 2 * Math.PI);
    c.fillStyle = "#fff"
    c.fill()
    c.clip();
    c.drawImage(img, originX - avatarR, 0, avatarR * 2, avatarR * 2);
    c.restore()
    // 文字
    c.beginPath();
    c.translate(originX, height);
    c.fillStyle = "#fff"; //文本填充颜色
    c.font = "20px Arial"; //字体样式设置
    c.textBaseline = "middle"; //文本与fillText定义的纵坐标
    c.textAlign = "center"; //文本居中(以fillText定义的横坐标)
    c.fillText(text, 0, -10);

    const textCanvas = c.getImageData(0,0,width,height);
    const texture = new THREE.CanvasTexture(textCanvas);
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    let pinMaterial = new THREE.SpriteMaterial({
        map: texture,
        color: '#fff'
    });
    return new THREE.Sprite(pinMaterial);
}

init()