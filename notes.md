### MongoDB
* create mongodb cluster
* connection string
---

### NextAuth
* in create: &rarr; api/auth/[...nextauth]/route-name
  * &rarr; api/auth/[...nextauth]/route.ts 
  * &rarr; api/auth/[...nextauth]/options.ts
* options contain our providers (GitHub, Google, Credentials)
* in providers config we pass our client id and secret
* env variables must contain client ids, secrets and NEXTAUTH_SECRET
* in components, we need to have auth component that wraps all children with SessionProvider component
* we wrap children in layout.ts with AuthProvider component

### Mongoose

#### &rarr; Model

* struct &rarr; interface 
* model &rarr; extends that struct and mongoose Document
* define a schema
* export mongoose.models.Model || mongoose.model<ModelType>('Model', schema)
* 
#### &rarr; Db Connection

* we have a ts script with exported dbConnect function
* there we check if the mongoose.connection.readyState is 1
* if it is then return mongoose connection
* else perform connection and return it