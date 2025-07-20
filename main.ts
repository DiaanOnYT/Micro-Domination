// 🌌 Micro Domination – Polished Edition by DiaanOnYT

info.setScore(0)
info.setLife(3)

// 🌃 Galaxy-style backdrop (simple starscape)
scene.setBackgroundImage(img`
    . . . . . 5 . . . . . 5 . . . .
    . 5 . . . . . 5 . . . . . 5 . .
    . . . 5 . . . . . 5 . . . . . .
    . . . . . . . 5 . . . . 5 . . .
    . . 5 . . . . . . . . . . . 5 .
    . . . . . 5 . . . . . 5 . . . .
    . . . . . . . . . 5 . . . . . .
    5 . . . . . 5 . . . . . 5 . . .
    . . . 5 . . . . 5 . . . . . . 5
    . . . . . . . . . . 5 . . . . .
    . 5 . . . . . 5 . . . . . . . .
    . . . 5 . . . . . . . 5 . . . .
    . . . . . 5 . . . . . . . 5 . .
    . . . . . . . 5 . . . 5 . . . .
    . 5 . . . . . . . 5 . . . . . .
    . . . 5 . . . . . . . . 5 . . .
`)

// 🎯 Custom targeting reticle
let reticle = sprites.create(img`
    . . 5 . . 
    5 . 5 . 5 
    . . 5 . . 
`, SpriteKind.Player)
controller.moveSprite(reticle, 100, 60)
reticle.setFlag(SpriteFlag.StayInScreen, true)

// 🚀 Ship fire animation (projectile)
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let laser = sprites.createProjectileFromSprite(img`
        . . 2 2 . .
        . 2 4 4 2 .
        . . 2 2 . .
    `, reticle, 0, -100)
    laser.setFlag(SpriteFlag.AutoDestroy, true)
    music.pewPew.play()
})

// 👾 Detailed alien sprite
game.onUpdateInterval(1000, function () {
    let alien = sprites.create(img`
        . . c c c . . 
        . c 9 f 9 c . 
        c f f f f f c 
        . c 9 f 9 c . 
        . . c c c . . 
    `, SpriteKind.Enemy)
    alien.setVelocity(0, 35)
    alien.setPosition(randint(10, 150), 0)
    alien.setFlag(SpriteFlag.AutoDestroy, true)
})

// 💥 Beam vs Alien
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (beam, alien) {
    beam.destroy()
    alien.destroy()
    info.changeScoreBy(1)
})

// 💢 Alien hits player
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (player, alien) {
    alien.destroy()
    info.changeLifeBy(-1)
    music.smallCrash.play()
    if (info.life() <= 0) {
        game.over(false, effects.slash)
    }
})

// 🎶 Background music
music.setVolume(35)
music.playMelody("C5 A G F - G A B", 120)

