function is_ipv4_address(ip) {
  if (
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
      ip
    )
  ) {
    return true;
  }
  return false;
}

function is_ipv6_address(ip) {
  if (ip.includes(":")) {
    return true;
  }
  return false;
}

function split_cidr(subnets) {
  return new Promise((resolve) => {
    const arrayOfIPs = [];
    const SUBNET_LENGTH = subnets.length;
    for (let line = 0; line < SUBNET_LENGTH; line++) {
      if (subnets[line].includes("/")) {
        const CIDR = subnets[line].split("/");
        let totalIPs = 0;
        if (parseInt(CIDR[1]) === 32) totalIPs = 1;
        if (parseInt(CIDR[1]) === 31) totalIPs = 2;
        if (parseInt(CIDR[1]) === 30) totalIPs = 4;
        if (parseInt(CIDR[1]) === 29) totalIPs = 8;
        if (parseInt(CIDR[1]) === 28) totalIPs = 16;
        if (parseInt(CIDR[1]) === 27) totalIPs = 32;
        if (parseInt(CIDR[1]) === 26) totalIPs = 64;
        if (parseInt(CIDR[1]) === 25) totalIPs = 128;
        if (parseInt(CIDR[1]) === 24) totalIPs = 256;
        if (parseInt(CIDR[1]) === 23) totalIPs = 512;
        if (parseInt(CIDR[1]) === 22) totalIPs = 1024;
        if (parseInt(CIDR[1]) === 21) totalIPs = 2048;
        if (parseInt(CIDR[1]) === 20) totalIPs = 4096;
        if (parseInt(CIDR[1]) === 19) totalIPs = 8192;
        if (parseInt(CIDR[1]) === 18) totalIPs = 16384;
        if (parseInt(CIDR[1]) === 17) totalIPs = 32768;
        if (parseInt(CIDR[1]) === 16) totalIPs = 65536;
        if (parseInt(CIDR[1]) === 15) totalIPs = 131072;
        if (parseInt(CIDR[1]) === 14) totalIPs = 262144;
        if (parseInt(CIDR[1]) === 13) totalIPs = 524288;
        if (parseInt(CIDR[1]) === 12) totalIPs = 1048576;
        if (parseInt(CIDR[1]) === 11) totalIPs = 2097152;
        if (parseInt(CIDR[1]) === 10) totalIPs = 4194304;
        if (parseInt(CIDR[1]) === 9) totalIPs = 8388608;
        if (parseInt(CIDR[1]) === 8) totalIPs = 16777216;
        if (parseInt(CIDR[1]) === 7) totalIPs = 33554432;
        if (parseInt(CIDR[1]) === 6) totalIPs = 67108864;
        if (parseInt(CIDR[1]) === 5) totalIPs = 134217728;
        if (parseInt(CIDR[1]) === 4) totalIPs = 268435456;
        if (parseInt(CIDR[1]) === 3) totalIPs = 536870912;
        if (parseInt(CIDR[1]) === 2) totalIPs = 1073741824;
        if (parseInt(CIDR[1]) === 1) totalIPs = 2147483648;
        const submittedIP = CIDR[0].split(".");
        let firstOctet = parseInt(submittedIP[0]);
        let secondOctet = parseInt(submittedIP[1]);
        let thirdOctet = parseInt(submittedIP[2]);
        let fourthOctet = parseInt(submittedIP[3]);
        if (fourthOctet === 0) fourthOctet = 1;
        for (let z = 1; z < totalIPs; z++) {
          const tempIP =
            firstOctet +
            "." +
            secondOctet +
            "." +
            thirdOctet +
            "." +
            fourthOctet;
          if (fourthOctet === 255) {
            thirdOctet++;
            fourthOctet = 0;
          }
          if (thirdOctet === 255) {
            secondOctet++;
            thirdOctet = 1;
          }
          if (secondOctet === 255) {
            firstOctet++;
            secondOctet = 1;
          }
          fourthOctet++;
          arrayOfIPs.push(tempIP);
        }
        // resolve(arrayOfIPs);
      } else {
        arrayOfIPs.push(subnets[line]);
      }

      if (line === SUBNET_LENGTH - 1) {
        resolve(arrayOfIPs);
      }
    }
  });
}

module.exports = { split_cidr, is_ipv4_address, is_ipv6_address };
