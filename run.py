import subprocess

subprocess.run("node ./core/main.js & node ./core/premiumMain.js", shell=True)