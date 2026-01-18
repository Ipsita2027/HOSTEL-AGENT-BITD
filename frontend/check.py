import requests

def bulletize(items):
    string=[]
    for item in items:
        string.append(f"-{item}")
    return "\n\t      ".join(string)


def convert(time):
    match(time):
        case 0:
            return "BREAKFAST"
        case 1:
            return "LUNCH"
        case 2:
            return "SNACKS"
        case 3:
            return "DINNER"

def format_output(meals):
    ans=[]
    for meal in meals:
        ans.append(f"""
        {meal["day"]}
           {convert(meal["time"])}
              {bulletize(meal["items"])}
        """)
    return "".join(ans)

def call_api():
    res=requests.get(f"http://localhost:4000/meals?prompt={'What is for lunch and dinner today?'}")
    print(type(res))
    data=res.json()
    if data["type"]=="list":
        print(data["content"])
    else:
        print(data["content"])
call_api()
