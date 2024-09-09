# Examples taken from: https://realpython.com/python-concurrency/

import requests
import time
from typing import List

import concurrent.futures
import threading

thread_local = threading.local()

def get_session() -> requests.Session:
    if not hasattr(thread_local, "session"):
        thread_local.session = requests.Session()
    return thread_local.session

def download_site(url:str, session:requests.Session) -> None:
    session = get_session()
    with session.get(url) as response:
        print(f"Read {len(response.content)} from {url}")

def download_all_sites(sites: List[str]) -> None:
    with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
        executor.map(download_site, sites)

if __name__ == '__main__':
    sites = ["https://www.jython.org", "http://olympus.realpython.org/dice"] * 10
    
    start_time = time.time()
    download_all_sites(sites)
    duration = time.time() - start_time

    print(f"Downloaded {len(sites)} in {duration} seconds")