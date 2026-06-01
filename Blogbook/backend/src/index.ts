import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { decode, jwt, sign, verify } from 'hono/jwt'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Userrouter } from './routes/user';
import { Blogrouter } from './routes/blog';
import { cors } from 'hono/cors';
const app = new Hono<{
	Bindings: {
		DATABASE_URL: string,
    JWT_SECRET:string
	}
}>();
app.use('/*',cors())
app.route("/api/v1/user",Userrouter);
app.route("/api/v1/blog",Blogrouter);
app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.get('/loggedin',async (c) => {
	var loggedin=false;
 const header =c.req.header("Authorization") || "";
  const token = header.split(" ")[1];

  if (!token) {
    return c.json({loggedin});
  }

  try {
    const user = await verify(token, c.env.JWT_SECRET);
    if (user) {
		loggedin=true;
      return c.json({loggedin});
    }
  } catch (e) {
    console.log("JWT verification error:", e);
  }

  return c.json({loggedin});

})





export default app
