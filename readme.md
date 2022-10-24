# Soffle

Dear god, there are many ways to regret life decision. This is one of them.

Essentially, using Express as the backend and using Parcel as a bundling. Parcel is embedded into Express via a middleware.

You may notice there is a shared folder. I cannot make Parcel correctly understand that it exists; therefore, I resorted to using a symlink inside the public folder.

Whatever Parcel bundles up is placed into public_build folder. It'll be made as soon you serve the server, so don't worry about it.