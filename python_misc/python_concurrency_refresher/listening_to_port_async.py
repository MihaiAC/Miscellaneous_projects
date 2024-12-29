# Exercise aim: I want two functions working asynchronously
# First function listens to a specific port for a POST request. Once it gets one,
# it retrieves the data and adds it to a queue.
# Second function wakes up every x seconds. If an element is in the queue, it pops it
# and prints it. Otherwise, it increments a counter, prints it and goes back to being inactive.
import asyncio
from aiohttp import web

queue = asyncio.Queue(maxsize=0)

routes = web.RouteTableDef()
@routes.get('/')
async def get_handler(request):
    return web.Response(text="Server is up.")

@routes.post('/{data}')
async def post_handler(request):
    data = await request.text()
    await queue.put(data)
    return web.Response(text='Received data ' + str(data))

async def check_queue_periodically():
    counter = 0
    while True:
        await asyncio.sleep(3)
        if queue.empty():
            print("Queue empty counter: " + str(counter), flush=True)
            counter += 1
        else:
            data = await queue.get()
            print("Retrieved from queue: " + str(data), flush=True)

async def main():
    app = web.Application()
    app.add_routes(routes)
    
    # Starting the server that handles the POST request.
    app_runner = web.AppRunner(app)
    await app_runner.setup()
    site = web.TCPSite(app_runner)
    await site.start()

    # Start task that checks the queue.
    await check_queue_periodically()

    # Prevents main from returning and thus the program from exiting.
    await asyncio.Event().wait()

asyncio.run(main())