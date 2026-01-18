import streamlit as st
import requests

def bulletize(items):
    string=[]
    for item in items:
        string.append(f"-{item}")
    return "\n\t        ".join(string)


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
    ans=["Here's what I could find!!"]
    for meal in meals:
        ans.append(f"""
        {meal["day"]:}
           {convert(meal["time"])}
                {bulletize(meal["items"])}
        """)
    return "\n".join(ans)

if "messages" not in st.session_state:
    st.session_state["messages"]=[]

for msg in st.session_state["messages"]:
    with st.chat_message(msg["role"]):
        st.text(msg["content"])

prompt=st.chat_input(" Ask your query!! ")

if prompt:
    st.session_state["messages"].append({"role":"user","content":prompt})
    with st.chat_message("user"):
        st.text(prompt)
    with st.spinner("Thinking..."):
        res = requests.get(
            f"http://localhost:4000/meals?prompt={prompt}",
        )
    
    result=res.json()
    #DEMO FOR TESTING
        # result={"type":"list",
        #         "content":[{"day":"Sun","time":1,"items":["daal","roti"]},
        #                 {"day":"Sun","time":2,"items":["veg cultlet","tea"]},
        #                 {"day":"Sun","time":3,"items":["pulao","matar mushroon"]}
        #                 ]
        #     }
    if result["type"]=="list":
        st.session_state["messages"].append({"role":"assistant","content":format_output(result["content"])})
    else:
        st.session_state["messages"].append({"role":"assistant","content":result["content"]})

    st.rerun(); 


