import json

def read_text_file(filename):
	title = ""
	date = ""
	year = ""
	sections = []
	tags = []
	#headers = []
	#content = []
	with open(filename, "r") as formatthis:
		linedex = 0
		state = 0
		for line in formatthis.readlines():
			if linedex == 0:
				title = line.strip()
			elif linedex == 1:
				year = line.strip()
			elif linedex == 3:
				date = line.strip()
			elif linedex == 4:
				tags = line.strip().split()
			elif line.strip() == "":
				state = 1
			elif state == 1:
				state = 2
				sections.append({"header": "", "content": "", "startshidden": False})
				if line.strip()[0] == '#':
					sections[-1]["header"] = line.strip()[1:]
					sections[-1]["startshidden"] = True
				else:
					sections[-1]["header"] = line.strip()
				#headers.append(line.strip())
				#content.append([])
			elif state == 2:
				sections[-1]["content"]+="<p>"+line.strip()+"</p>"
				#content[-1].append(line.strip())
			linedex = linedex + 1
		output = {
			"title": title,
			"date": date,
			"sections": sections
		}
	return (output, year, tags)
		
		
def read_index_file():
	next_index = 0
	with open("./lscom/src/blog/blogIndex.json", 'r') as indexfile:
		indexdata = json.load(indexfile)
		next_index = [datum["index"] for datum in indexdata if "index" in datum.keys()]
		

def convert_to_json(filename):
	(output, year, tags) = read_text_file("./lscom/src/blog/"+filename)
	
	with open("testfile.json", 'w') as writeto:
		json.dump(output, writeto, indent = 2)
		
	
	indexoutput = {
		"year": year,
		"name": title,
		"file": filename.split('.')[0],
		"index": 0,
		"prev": "",
		"next": "",
		"tags": tags
	}
	with open("testindexfile.json", 'w') as indexfile:
		json.dump({"year": year,})
	
	
	
	
	
	
	
	
	
	
	