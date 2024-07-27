---
title: 'Mozart'
image: '/projects/mozart/assets/mozart.png'
summary: 'Introducing Mozart: The Piano Playing Robot and Sight Reader'
created: 2024-07-27
updated: 2024-07-27
published: 2024-07-27
tags: ['Music', 'Robotics', 'Inverse Trig']
# TODO: Add a cover image
---

### What is Mozart?

Mozart is a piano playing robot I made over the summer of 2024. It uses three servos to play songs on a Nintendo Labo piano. Additionally, via a USB Cable, it can can listen to instructions from my computer to play preset songs and sight read!

### Why Mozart?

As I was preparing to enter my freshmen year at UIUC, I was looking around my house for projects to work on. For a while, I was stumped, unable to find anything intresting enough to work on. Then, as I was going to bed one night, it hit me. Literally. My Nintendo Labo toys fell down from my shelf onto my bed as I nunged them slightly while getting into bed.

<img src="/projects/mozart/assets/labo.jpg" alt="Nintendo Labo on Shelf" style="width: 100%; max-width: 400px; margin: 0 auto; display: block; border-radius: 5px;" />

I've always loved those youtube videos where programmers teach AI's how to play games. So I thought, why not make a robot that can play with these toys. Most of the toys are far too complex to automate, such as the house, where different blocks needed to be moved around different locations of the toys with extremely complex and percise movement that would be hard to replicate consistently with a robot. Finally, after looking at each toy, I decided on the piano because it could play simple songs with the press of a few keys.

### How Mozart?

#### Defining Mozart's Goals

First, I defined my goals for the project. Mozart will be able to ...

- Play any note on the song, including different octaves
- Communicate with my computer to play simple songs
  - Sight read songs from sheet music

#### Research Other Robot Pianos

Next, I did some research and found other robot pianos for inspiration. Below are the projects that had the most impact on Mozart's design.

- [Robotic Piano Player](https://www.instructables.com/Robotic-Piano-Player/)

  - Wooden robot frame with tube slider
  - Uses two servos to (1) switch which key was hovered over and (2) press a key down.
  - Two linkages were connected from servo 1 to the carriage servo 2 sat in, in order to convert the rotational movement of the servo 1 into a linear movement of the carriage servo 2.

- [Prima - a Robot That Plays Piano](https://www.instructables.com/Prima-a-Robot-That-Can-Play-Piano/)

  - Modeled and 3d printed robot frame. Used smaller thin metal sliders for the carriage to sit on.
  - Same linkage system as above.

- [Piano-Playing Robot](https://magpi.raspberrypi.com/articles/piano-playing-robot)

  - Uses a Rasppberry Pi Camera and the Audiveris software to sight read sheet music.
  - Plays keys using many solenoids

There were many other piano playing robots out there that used human liked hands and many servos like the Piano-Playing Robot above. However I only had three servos and no solenoids, so I decided to mimic the key playing capabilities of the first two links above. While this two servo system could not play two notes at once, they could still play simple songs, which was enough for my goals. Additionally, I loved the way the third robot sight read music using Audiveris since creating my own OMR (optical music recognition) system was out of the scope of this project due to the amount of time it would take to create a reliable system.

Thus, I decided my actuators would be...

- 3 Servos
  1. The Octave Servo to to switch octaves using the slider on the side of the piano
  1. The Finger Servo to press keys down
  1. The Control Servo move the above Finger Servo to every note on the piano

In order to control these servos, I decided to use an Arduino Uno since I had many lying around. Additionally, I also wanted to use a LCD screen to display data to help me debug the program. I initially thought there weren't enough PWM pins on the Arduino Uno, and thus ended up using two connected arduinos to control the servos and the display even though I only needed one.

#### Designing Mozart

Alone each servo does absolutely nothing. In order to make the servos useful, I designed a chassis consistenting of three parts. The first part is the control tower holding the Control Servo, which is connected to the Finger Servos via two linkages. Like the Robotic Piano Player, this converts the rotational movement of the Control Servo into linear movement of the Finger Servo. Speaking of the Finger Servo, the second part consists of a carriage holding the Finger Servo (where the linkages conect the Servo to the carriage) and a slider which the carriage moves across. Lastly, the third part is simply the Octave Servo moving the slider up and down to change the current octave.

Below is the [CAD Diagram](https://cad.onshape.com/documents/b60b9473f4f9b61c47c6c72e/w/1de31bfd9af2d89d107784d6/e/2c87f2b32c5539a205e8c369?renderMode=0&uiState=66a4679bbe0195001f75e8a3).

![Mozart Chassis CAD Image](/projects/mozart/assets/MozartCAD.png)

And here is Mozart's carriage moving across the slider.

![Mozart Animation](/projects/mozart/assets/LoopingArm.gif)

##### Design Problems

While designing Mozart I encountered many issues. Here are some of the ones I learned the most from.

1. Initially, I had the Control Servo right against the slider. However, after testing this, I realized that the carriage wouldn't budge as the Control Servo spun, instead the carriage just rotated in place. To fix this, I looked back at my research and noticed both the Robotic Piano Player and Prima placed the Control Servo slightly behind the slider. I tried this out by holding the servo in place with my hand and rotating it, and the extra space worked! Thus, I added a small spacer between the Control Servo and the slider, resolving the issue. From this I learned that I should test mechanisms in real life more before 3D printing it completely to ensure they work properly and thus save plastic and time. (Time especially because my printer is very slow)

<section style="display: flex; justify-content: space-between; padding: 0 0 50px 0; width: 95%; margin: 0 auto;">
    <div style="text-align: center; width: 50%; padding: 0 5px 0 0;">
        No Spacer
        <div style="padding: 5px 0" />
        <img src="/projects/mozart/assets/NoSpacer.png" alt="No Spacer" style="width: 90%; max-width: 400px; height: 100%; margin: 0 auto; display: block; border-radius: 5px;" />
    </div>
    <div style="text-align: center; width: 50%; padding: 0 0 0 5px;">
        Spacer
        <div style="padding: 5px 0" />

        <img src="/projects/mozart/assets/Spacer.png" alt="Spacer" style="width: 90%; max-width: 400px; height: 100%; margin: 0 auto; display: block; border-radius: 5px;" />
    </div>

</section>

2. The carriage couldn't make small adjustments easily when the control servo moved slightly. After some testing, I concluded that this was because the torque of the control servo wasn't strong enough to overcome the static friction between the rails and the carriage. The rails were just random wooden sticks I found lying around because I lacked any alternative pieces. I resolved this by adding an external power supply, providing the servos with much more current and thus the torque required to overcome the friction.
   ![Power Supply](/projects/mozart/assets/PowerSupply.jpg)

#### Wiring Mozart

While Mozart was being brought to life mechanically, I also fully wired it up to the Arduino Uno in order to test my mechanisms. I created the following wire diagram afterword to show my work. One thing I learned from this process is that I should've done my wire diagram before I began wiring since it would shown me I only needed one Arduino for the project. Instead I connected the Arduino to another Arduino via the RX and TX pins, which I hadn't realized was possible. Funnily enough, this small mistake of missing a PWM pin actually taught me a lesson about UART communications. Additionally, when wiring the LCD, I realized I had no potentiometer to adjust the contrast, so I learned how to made a makeshift one using two resistors.

![Circuit](/projects/mozart/assets/Circuit.png)

#### Programming Mozart

Lastly, after wiring and building Mozart I had to program it. I thought this part would be easy since it was just controlling three servos, but I was wrong.

##### Inverse Trigonometry

First to practice my mathematics, I solved the inverse trignometric equations for Theta (the angle of the control servo) as a function of the slider's position. Here is the equation I solved for.

[Work available here](https://drive.google.com/file/d/1hQT2yIbzU4SllDZLqfYMm9NvW1JkTd02/view?usp=sharing) | [Graph available here](https://www.desmos.com/calculator/kd0jjbwytb)
![Solution](/projects/mozart/assets/inv_trig.png)

<!-- TODO: Fix image to have background color -->

Then using that equation, I solved for the angle of the control servo for each key on the piano. This worked relatively well, but I had to do some minor tweaking to get more accurate results. Overall, the inverse trigonometry was fun, but unnecessary since guess and check would have worked much faster. However, I learned a lot from this process and will definitely use it in future more complex projects where guess and check won't work.

##### Mozart App

In order to play any songs on the piano, Mozart needed instructions. So I created a simple app that would send instructions to Mozart from my computer. The app was written in Python due to is simplicity and used the [Custom Tkinter Library](https://github.com/TomSchimansky/CustomTkinter) to create a simple good looking GUI. Then using MuseScore, I created sheet music for each song and saved them as mxl files.

##### Programming Problems

1. When the Servo was given a command to move to a certain angle, it would take a different amount of time depending on the difference between the current angle and the desired angle. Initially, I was just using a constant delay after the Control Servo was given a command no matter what angle was given, but sometimes this would cause the Finger Servo to push down before the Control Servo was done moving. To fix this, I researched different delay methods and found a library called [VarSpeedServo](https://github.com/netlabtoolkit/VarSpeedServo) that allows you to wait until the servo is done moving before continuing, fixing the issue. Additionally, this solved the problem of the Control Servo overshooting the carriage due to the carriage gaining high velocity as the control servo accelerated it, making it hard to percisely move the carriage. Thus, by rotating slower, the carriage moves more smoothly at slower speeds. At the expensive of a faster piano playing robot, this added consistency was a great tradeoff.

2.
