# TDD ( 테스트 주도 개발 )

<br/>

> "반복 테스트를 이용한 소프트웨어 방법론으로 작은 단위의 테스트 케이스를 작성하고 이를 통과하는 코드를 추가하는 단계를 반복하여 구현한다."

<br/>

---

<br/>
새로운 기능을 개발할 때는 항상 오류 없이 순조롭게 진행되다가,
<br/>
왜 검수 기간 만 되면 생각지도 못한 오류를 직면하게 될까?
<br/>
<br/>
물론 매우 간단한 Flow나 매번 구현해오던 익숙한 기능은 오류 확률이 매우 적다.
<br/>
하지만, Flow가 매우 복잡한 기능이거나 생소한 개념의 기능을 개발할 때는
<br/>
오류 확률이 기존 기능보다 확실히 올라간다.
<br/>
<br/>
이를 해결하기 위해 필요한 부분만, 확실히 테스트가 필요한 부분만
<br/>
"적당히" TDD 방법론에 따라 테스트 코드를 작성할 수 있다.
<br/>
<br/>
TDD에 너무 몰입해버리면 나머지 기능 개발에 대한 리소스를 갉아먹기 때문에
<br/>
능률 저하가 우려될 수 있다.
<br/>
고로 "적당히".
<br/>
<br/>
이 Repository에서는 TDD 방법론을 익히며, 실무에서 사용할 수 있을 만한
<br>
테스트 코드를 작성해보려 한다.
<br>
<br>

---

<br/>
<b style="color:#ff4254;font-size:1.25rem;">Red</b><br/>
해당 단계에서는 실패할 테스트 코드를 작성한다.
<br/>
<br/>
<b style="color:#31d785;font-size:1.25rem;">Green</b><br/>
해당 단계에서는 <span style="color:#ff4254;font-weight:500;">Red</span> 단계에서 실패한 테스트 코드를 성공시키기 위한 소스 코드로 재작성한다.
<br/>
<br/>
<b style="color:#4c6bdb;font-size:1.25rem;">Blue</b><br/>
해당 단계에서는 완성된 소스 코드를 리팩토링한다.
<br>
<br>

---

<br/>

## Example

- ### [Jest Practice](./src/__tests__/shared/function.test.ts)
