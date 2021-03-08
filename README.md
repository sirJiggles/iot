# What

Right now there is just one device the "desk buddy"

this is:

- A motion sensor to turn on and off hue lights when I am at or away from my desk
- LCD screen to show total in euros in crypto currencies

![IMG-20210308-WA0007](https://user-images.githubusercontent.com/1426390/110394947-94bae900-806d-11eb-969b-5eaa62335afb.jpg)

# How

it is a type script project in a lerna repo. to get it running on audiono have a look at the jonny five docs, you need to tehter it to USB for now but I will get a raspery pi soon to solve this.

- There is a package for lint and for the desk buddy 
- There is a yarn script to run from root `yarn deskBuddy` which will do all the things

# Still to come

- Connect it all through raspery pi
- connect some kind of sensor to track steps on my treadmil?
- connect motion sensor to update my slack status "away from desk, at desk"
- make some nice housing for it
- maybe even make a pcb if it works really well
