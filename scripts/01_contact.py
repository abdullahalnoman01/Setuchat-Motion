# Build labelled contact sheets from a folder of frames. usage: python scripts/01_contact.py <glob> <fps> <out_prefix> [cols] [rows]
import sys,glob
from PIL import Image,ImageDraw
files=sorted(glob.glob(sys.argv[1])); fps=float(sys.argv[2]); out=sys.argv[3]
cols=int(sys.argv[4]) if len(sys.argv)>4 else 9; rows=int(sys.argv[5]) if len(sys.argv)>5 else 6
per=cols*rows
for p in range(0,len(files),per):
    chunk=files[p:p+per]; im0=Image.open(chunk[0]); w,h=im0.size
    sheet=Image.new('RGB',(cols*w,rows*h),'black'); d=ImageDraw.Draw(sheet)
    for k,f in enumerate(chunk):
        x,y=(k%cols)*w,(k//cols)*h; sheet.paste(Image.open(f).resize((w,h)),(x,y))
        d.text((x+3,y+3),f"{(p+k)/fps:.2f}s",fill=(255,255,0))
    sheet.save(f"{out}_{p//per+1}.jpg",quality=75)
    print(f"{out}_{p//per+1}.jpg")
