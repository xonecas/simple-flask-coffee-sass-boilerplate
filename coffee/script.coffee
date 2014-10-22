(->

    delayedText = (selector, text) ->
        body = $ selector
        text = text || body.data "text"
        letters = text.split ''
        wait = 200

        insertLetter = ->
            tag = $ "<span class='fade out'>#{letters.shift()}</span>"
            body.append tag

            task = ->
                tag.removeClass "out"
                tag.addClass "in"
                insertLetter() if letters.length

            setTimeout task, wait

        setTimeout insertLetter, wait

    three = () ->
        scene = new THREE.Scene()
        camera = new THREE.PerspectiveCamera 75,
            Math.floor window.innerWidth / window.innerHeight, 0.1, 1000
        renderer = new THREE.WebGLRenderer antialias: on

        renderer.setSize window.innerWidth, window.innerHeight
        $("#three-test").html renderer.domElement

        geometry = new THREE.BoxGeometry 2, 2, 2
        material = new THREE.MeshDepthMaterial
            opacity: 0.1,
            wireframe: true
            wireframeLinewidth: 0.1
        cube = new THREE.Mesh geometry, material
        scene.add cube

        light = new THREE.AmbientLight 0x404040
        scene.add light

        camera.position.z = 5

        middleVertical = Math.floor window.innerHeight / 2
        middleHorizontal = Math.floor window.innerWidth / 2
        clientY = 0
        clientX = 0
        document.addEventListener "mousemove", (ev) ->
            clientY = ev.clientY
            clientX = ev.clientX

        render = () ->
            requestAnimationFrame render

            if clientX > 0 and clientX < window.innerWidth
                cube.rotation.x = (middleVertical - clientY) / 100
            else
                cube.rotation.x += 0.001

            if clientY > 0 and clientY < window.innerHeight
                cube.rotation.y = (middleHorizontal - clientX) / 100
            else
                cube.rotation.y += 0.001

            renderer.render scene, camera

        render()


    $ ->
        delayedText "#smooth"
        three()

)()
