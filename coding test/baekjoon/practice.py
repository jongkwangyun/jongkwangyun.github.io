a = '000'

b = list(a)
b[1] = '1'
a = ''.join(b)
print(a)