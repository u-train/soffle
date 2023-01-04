# Soffle

Run `npm run serve` to start the webserver.

Run `npm test` to run against unit tests.

Dear god, there are many ways to regret life decision. This is one of them.

Essentially, using Express as the backend and using Webpack as the bundler/frontend via a middleware. Jest is the testing framework being used.

This is really right now a fun project for me to do (learning about netcode primarily). It's also to get my grade written-off, as well.

## The Actual Game

A clone of [Solar Scuffle](https://www.roblox.com/games/178495382) from Roblox. The concept is simple, space arcade RTS where you fight against 3 other players by taking all of the planets. There's also structures to help you or hinder your enemies in the small arena.

## Current Plans

Right now, the goal is to get something running. 

### Backend

Essentially, stealing [Age of Empire's network architecure](https://zoo.cs.yale.edu/classes/cs538/readings/papers/terrano_1500arch.pdf). The primary part would be the built-in [entity interoplation](https://ruoyusun.com/2019/09/21/game-networking-5.html) by explicitly ordering inputs into the future instead of the present.

Some more links for useful information:
- https://developer.valvesoftware.com/wiki/Source_Multiplayer_Networking
- https://www.gabrielgambetta.com/client-server-game-architecture.html

### Frontend

Right now, homemade frontend rendering to a canvas. Takes in callbacks for user events and have defined methods to invoke for certain events (like a new entity added). In the future, probably would want to use something that's not half-baked.

## Future stuff

### Immediate

An interface for matchmaking with the options to:

1. Join a public lobby.
2. Create/Join a specified lobby with your friends.
3. Replay a match (either stored on the server or locally). 

Having a capable COM player with a few difficulty settings from beginner to... computer.

A chatroom to talk to other people with smack.

I want to also add more special objects beyond turrets and warp drives. I don't got any ideas right now, but maybe for the future.

Bigger maps with more players on them. Fortunately, the simulation can support it. Unfortunately, that requires more work.

Custom maps.

I want to also eventually make it so that I can reverse the simulation for a few reasons.

- Replaying would be a built-in feature of the simulation.
- Being able to immediately apply (unconfirmed) local inputs, then "pop" the input if new information comes in, then reapply it again.
- No longer needing to have a buffer of everyone's past inputs to continue simulating. Just apply and reverse if needed.

Alas, it'll require a complete tearing-up of the current simulation since this feature wasn't accounted for.
