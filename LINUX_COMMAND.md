# 리눅스 기본 명령어

리눅스 기본 명령어를 알아보겠습니다.

#### 1. 파일 시스템 탐색 기본 명령어

**pwd**
    Print Working Directory, 현재 디렉토리의 절대 경로를 표시한다
```
$ pwd
/home/vagrant
```

**cd**
    Change Directory, 작업 디렉토리 위치를 바꾼다.

```
# 홈 디렉토리로 이동
$ cd 또는 cd ~
[vagrant@host3 ~]$

# 최상위 루트 디렉토리로 이동
$ cd /
[vagrant@host3 /]$

# 한 단계 상위 디렉토리로 이동
[vagrant@host3 bitcamp-study]$ cd ..
[vagrant@host3 git]$

# 바로 전에 위치했던 디렉토리로 이동
[vagrant@host3 git]$ cd -
/home/vagrant/git/bitcamp-study

# 지정한 디렉토리로 이동
[vagrant@host3 sysconfig]$ cd /home/vagrant
[vagrant@host3 ~]$
```

**ls**
    현재 디렉토리의 내용을 출력한다.
```
# 기본 명령어
[vagrant@host3 ~]$ ls
git

# -a : 숨겨진 파일이나 디렉토리도 출력
[vagrant@host3 ~]$ ls -a
.  ..  .bash_history  .bash_logout  .bash_profile  .bashrc  git  .gitconfig  .pki  .ssh

# -l : 자세한 내용을 출력
[vagrant@host3 ~]$ ls
total 0
drwxrwxr-x. 3 vagrant vagrant 27 Nov 21 12:18 git

# -i : 파일별 인덱스 값을 첫 열에 출력
[vagrant@host3 bitcamp-study]$ ls -i
33601804 docs  67593005 hard_link  67593005 README.md  67593014 soft_link
```


**file**
    파일의 종류 및 속성을 확인할때 사용한다.
```
[vagrant@host3 bitcamp-study]$ file README.md
README.md: UTF-8 Unicode text
```

**less**
    파일의 내용을 페이지 단위로 나누어서 보여준다.
```
[vagrant@host3 bitcamp-study]$ less README.md

##### 신규 페이지 
# 네이버 클라우드 기반 AIaaS 개발자 과정

- 구글 미트
    - https://meet.google.com/vpv-ojws-dpr
```


#### 2. 파일과 디렉토리 조작 명령어

**cp**

```
# 복사할 파일, 복사 후 파일 명
[vagrant@host3 bitcamp-study]$ cp a.txt b.txt
[vagrant@host3 bitcamp-study]$ ls
a.txt  b.txt  docs  README.md

# 앞에 파일, 뒤에 디렉토리가 오면 파일을 디렉토리에 복사
[vagrant@host3 bitcamp-study]$ cp a.txt docs/
[vagrant@host3 bitcamp-study]$ cd docs
[vagrant@host3 docs]$ ls
1.프로그래밍_준비.pdf  2.리눅스.pdf  a.txt  상세커리큘럼.xlsx

# 앞에 파일들을 입력하고 뒤에 디렉토리가 오면 파일들을 디렉토리로 복사
[vagrant@host3 bitcamp-study]$ cp a.txt b.txt docs/
[vagrant@host3 bitcamp-study]$ cd docs
[vagrant@host3 docs]$ ls
1.프로그래밍_준비.pdf  2.리눅스.pdf  a.txt  b.txt  상세커리큘럼.xlsx

# -r : 디렉토리 전체를 복사
[vagrant@host3 bitcamp-study]$ cp -r docs/ docs2/
[vagrant@host3 bitcamp-study]$ ls
a.txt  b.txt  docs  docs2  README.md
```

**mv**
    파일이나 디렉토리를 이동시킬때 사용한다.
```
# 파일 이동
[vagrant@host3 bitcamp-study]$ mv a.txt docs
[vagrant@host3 bitcamp-study]$ cd docs
[vagrant@host3 docs]$ ls
1.프로그래밍_준비.pdf  2.리눅스.pdf  a.txt  상세커리큘럼.xlsx

# 파일 명 변경
[vagrant@host3 docs]$ mv a.txt hello.txt
[vagrant@host3 docs]$ ls
1.프로그래밍_준비.pdf  2.리눅스.pdf  hello.txt  상세커리큘럼.xlsx
```

**mkdir**
    Make Directory, 디렉토리 생성시 사용한다.

```
# 기본 명령어
[vagrant@host3 bitcamp-study]$ mkdir new_folder
[vagrant@host3 bitcamp-study]$ ls
docs  docs2  new_folder  README.md

# 지정 위치에 디렉토리 생성
[vagrant@host3 bitcamp-study]$ mkdir /home/vagrant/new_folder
[vagrant@host3 bitcamp-study]$ cd
[vagrant@host3 ~]$ ls
git  new_folder

# -p : 디렉토리 안에 디렉토리 생성
[vagrant@host3 ~]$ mkdir -p new1/new2
.
└── new1
    └── new2
```

**rm**
    파일이나 디렉토리를 삭제한다.
```
# 기본 명령어
[vagrant@host3 docs]$ rm hello.txt
[vagrant@host3 docs]$ ls
1.프로그래밍_준비.pdf  2.리눅스.pdf  상세커리큘럼.xlsx

# rm *.txt : .txt로 끝나는 모든 파일 삭제
[vagrant@host3 docs]$ ls
1.프로그래밍_준비.pdf  2.리눅스.pdf  a.txt  b.txt  상세커리큘럼.xlsx
[vagrant@host3 docs]$ rm *.txt
[vagrant@host3 docs]$ ls
1.프로그래밍_준비.pdf  2.리눅스.pdf  상세커리큘럼.xlsx

# -r : 디렉토리 삭제
[vagrant@host3 bitcamp-study]$ rm -r new_folder
[vagrant@host3 bitcamp-study]$ ls
docs  docs2  README.md

# -rf : 강제 삭제. 아주 위험한 명령이니 주의
[vagrant@host3 bitcamp-study]$ rm -rf docs2
[vagrant@host3 bitcamp-study]$ ls
docs  README.md
```

**ln**
    Link, 파일을 가리키는 링크 파일을 만든다.
    두 가지 종류가 존재하는데 심볼릭 링크, 하드 링크가 있다.
    - 하드 링크 (Hard Link)
        원본 파일과 다른 이름으로 존재하는 동일한 파일이다. 원본 파일과 링크 파일은 서로 다른 파일이기 때문에 둘 중 하나를 삭제하더라도 나머지 하나는 그대로 남아있다. 또한 원본 파일이 변경되면 링크 파일의 내용도 변경된다.
    - 심볼릭 링크 (Symbolic Link)
        단순 원본 파일을 가리키도록 한다. WindowsOS의 바로가기와 유사하다. 원본 파일이 삭제되면 링크 파일에서는 원본 파일이 없다는 것을 알려준다.
```
# 하드 링크, 심볼릭 링크 만들기
[vagrant@host3 bitcamp-study]$ ln README.md hard_link
[vagrant@host3 bitcamp-study]$ ln -s README.md soft_link
[vagrant@host3 bitcamp-study]$ ls -il
total 8
33601804 drwxrwxr-x. 2 vagrant vagrant   96 Nov 21 23:54 docs
67593005 -rw-rw-r--. 2 vagrant vagrant 1378 Nov 21 01:50 hard_link
67593005 -rw-rw-r--. 2 vagrant vagrant 1378 Nov 21 01:50 README.md
67593014 lrwxrwxrwx. 1 vagrant vagrant    9 Nov 22 00:06 soft_link -> README.md
```

#### 3. 명령어를 다루는 명령어

**type**
    명령 유형에 대한 정보를 표시합니다.
```
# 기본 명령
[vagrant@host3 bitcamp-study]$ type pwd
pwd is a shell builtin
```

**which**
    명령어의 실행파일 위치, 소스위치, Man 페이지 파일의 위치를 찾아준다.
```
[vagrant@host3 bitcamp-study]$ which mkdir
/usr/bin/mkdir
```

**man**
    각종 명령어, 프로그램의 사용법을 확인한다.
```
[vagrant@host3 bitcamp-study]$ man cp

##### 신규 페이지
CP(1)                                User Commands                               CP(1)

NAME
       cp - copy files and directories
```

**apropos**
    검색어와 관련된 명령어를 whatis DB에서 검색하여 간단한 설명과 함께 출려한다.
```
[vagrant@host3 bitcamp-study]$ apropos mv
git-mv (1)           - Move or rename a file, a directory, or a symlink
mv (1)               - move (rename) files
mv (1p)              - move files
```

**info**
    명령어의 사용 방법, 옵션 등을 나타낸다.
```
[vagrant@host3 bitcamp-study]$ info rmdir

##### 신규 페이지
ile: coreutils.info,  Node: rmdir invocation,  Next: unlink invocation,  Prev: readlink\ invocation,  Up: Special file types

12.7 'rmdir': Remove empty directories
======================================
```

**whatis**
    명령어에 대한 기능을 간략하게 나타낸다. whatis DB에서 문자열만 검색한다.
```
[vagrant@host3 bitcamp-study]$ whatis type
type (1)             - bash built-in commands, see bash(1)
type (1p)            - write a description of command type
```

**alias**
    사용자가 명령어를 다른 이름으로 바꿔서 사용할 수 있다.
```
# alias 등록
[vagrant@host3 bitcamp-study]$ alias gg='cd /home/vagrant/git/bitcamp-study'
[vagrant@host3 bitcamp-study]$ alias
alias gg='cd /home/vagrant/git/bitcamp-study'
[vagrant@host3 ~]$ gg
[vagrant@host3 bitcamp-study]$

# alias 해제
[vagrant@host3 bitcamp-study]$ unalias gg
```


---------------------

### [홈으로](README.md)

### [Hyperviser란?](HYPERVISOR.md)

### [MarkDown이란?](MARKDOWN.md)

### 리눅스 기본 명령어