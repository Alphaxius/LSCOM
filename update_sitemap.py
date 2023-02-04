import json
from random import randint
import sys
import os.path
import xml.etree.ElementTree as ET
			
### read newblog.txt and parse into json
def read_text_file():
	uri = ""
	title = ""
	date = ""
	year = ""
	sections = []
	tags = []
	with open("newblog.txt", "r") as formatthis:
		linedex = 0
		state = 0
		for line in formatthis.readlines():
			if linedex == 0:
				uri = line.strip()
			elif linedex == 1:
				title = line.strip()
			elif linedex == 2:
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
	return (output, year, uri, tags)
		
### load blogIndex.json into a python object
def read_index_file():
	indexdata = []
	with open("./lscom/src/blog/blogIndex.json", 'r') as indexfile:
		indexdata = json.load(indexfile)
	return indexdata

### return a random character string
def create_file_name():
	return "".join([chr(randint(65,90)) for _ in range(16)])

### return file name and file location for new blog post
def file_name_loc_wrap():
	filename = create_file_name()
	return (filename, "./lscom/src/blog/"+filename+".json")

### regenerate sitemap.xml
def convert_to_xml(year, uri):
	ET.register_namespace("","http://www.sitemaps.org/schemas/sitemap/0.9")
	sitemap = ET.parse("./lscom/public/sitemap.xml")
	sitemaproot = sitemap.getroot()
	newxmllocpre = "<url><loc>https://www.lasershaft.com/Blog/"
	newxmllocpst = "</loc></url>"
	newxml = ET.fromstring(newxmllocpre+year+"/"+uri+newxmllocpst)
	sitemaproot.append(newxml)
	return sitemaproot

### generates blog file json and blog index json
def convert_to_json():
	(output, year, uri, tags) = read_text_file()
	(filename, fileloc) = file_name_loc_wrap()
	while os.path.isfile(fileloc):
		(filename, fileloc) = file_name_loc_wrap()

	indexoutput = {
		"year": year,
		"name": uri,
		"file": filename,
		"index": 0,
		"prev": "",
		"next": "",
		"tags": tags
	}

	indexdata = read_index_file()
	currentindex = indexdata[0]["gotoindex"]
	currentyear = indexdata[0]["gotoyear"]

	while year != currentyear:
		changeyear = str(input("change current year from "+currentyear+" to "+year+"? (abort/Y/N) ")).strip()
		if changeyear == "Y":
			indexdata[0]["gotoyear"] = year
			currentyear = year
			break
		elif changeyear == "N":
			break
		else:
			print("Aborted, current year did not match and user did not input Y or N")
			sys.exit(1)
  
	newindex = (((currentindex) + 10) // 10) * 10
	indexoutput["index"] = newindex
	indexdata[0]["gotoindex"] = newindex
	
	prevdatumdex = 0
	prevdatum = {}
	for (datumdex, datum) in enumerate(indexdata):
		if not("index" in datum.keys()):
			continue
		if datum["index"] == currentindex:
			prevdatumdex = datumdex
			prevdatum = datum
			break
			
	newsubpage = "/"+year+"/"+uri
	
	indexoutput["prev"] = "/"+prevdatum["year"]+"/"+prevdatum["name"]
	indexoutput["next"] = newsubpage
	
	indexdata[prevdatumdex]["next"] = newsubpage
	indexdata.insert(1, indexoutput)
	
	return (fileloc, output, indexdata)

	
def main():
	(blogfileloc, blogjson, blogindexjson) = convert_to_json()
	sitemapxml = convert_to_xml(blogindexjson[1]["year"], blogindexjson[1]["name"])
	with open(blogfileloc, 'w') as newblogfile:
		json.dump(blogjson, newblogfile, indent = 2)
	with open("./lscom/src/blog/blogIndex.json", "w") as blogindexfile:
		json.dump(blogindexjson, blogindexfile, indent = 2)
	with open("./lscom/public/sitemap.xml", 'wb') as sitemapfile:
		sitemapfile.write(ET.tostring(sitemapxml, xml_declaration=True, encoding="UTF-8"))
	
	
if __name__ == "__main__":
	main()
	
	
	
	
	
	
	
	
	
