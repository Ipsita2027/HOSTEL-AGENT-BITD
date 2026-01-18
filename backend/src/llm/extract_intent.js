export const extractJSON=(raw)=> {
  let start = -1;
  let depth = 0;
  let inString = false;
  let escape = false;

  for (let i = 0; i < raw.length; i++) {
    const c = raw[i];

    if (start === -1) {
      if (c === "{" || c === "[") {
        start = i;
        depth = 1;
      }
      continue;
    }

    if (inString) {
      if (escape) {
        escape = false;
        continue;
      }
      if (c === "\\") {
        escape = true;
        continue;
      }
      if (c === '"') inString = false;
      continue;
    }

    if (c === '"') {
      inString = true;
      continue;
    }

    if (c === "{" || c === "[") depth++;
    if (c === "}" || c === "]") depth--;

    if (depth === 0) {
      const json = raw.slice(start, i + 1);
      const jsonobj=JSON.parse(json)
      console.log(jsonobj)
      return jsonobj;
    }
  }

  throw new Error("No valid JSON found");
}
